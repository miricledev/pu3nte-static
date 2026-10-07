import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { remotionEntry, projectRoot } from "./config";
import type { GeneratorCallbacks, LessonTimeline } from "./types";

type LocalFileServer = {
  url: string;
  backgroundUrl?: string;
  close: () => Promise<void>;
};

function getContentType(filePath: string): string {
  if (filePath.toLowerCase().endsWith(".mp3")) {
    return "audio/mpeg";
  }

  if (filePath.toLowerCase().endsWith(".png")) {
    return "image/png";
  }

  if (filePath.toLowerCase().endsWith(".jpg") || filePath.toLowerCase().endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (filePath.toLowerCase().endsWith(".webp")) {
    return "image/webp";
  }

  return "application/octet-stream";
}

function streamFile(filePath: string, request: http.IncomingMessage, response: http.ServerResponse): void {
  const stat = fs.statSync(filePath);
  const range = request.headers.range;
  const contentType = getContentType(filePath);

  if (range) {
    const match = range.match(/bytes=(\d+)-(\d*)/);
    const start = match ? Number.parseInt(match[1], 10) : 0;
    const end = match?.[2] ? Number.parseInt(match[2], 10) : stat.size - 1;

    response.writeHead(206, {
      "accept-ranges": "bytes",
      "content-length": end - start + 1,
      "content-range": `bytes ${start}-${end}/${stat.size}`,
      "content-type": contentType,
    });
    fs.createReadStream(filePath, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, {
    "accept-ranges": "bytes",
    "content-length": stat.size,
    "content-type": contentType,
  });
  fs.createReadStream(filePath).pipe(response);
}

function getDialectBackgroundImagePath(timeline: LessonTimeline): string | null {
  const lookupText = [
    timeline.lesson.id,
    timeline.lesson.outputSlug,
    timeline.lesson.course,
    timeline.lesson.title,
  ].join(" ").toLowerCase();

  const backgroundByNeedle: Array<[RegExp, string]> = [
    [/moroccan|darija|المغربية|الدارجة/i, "moroccan-darija-andalusian-spanish-bg.png"],
    [/colombian|colombia/i, "colombian-spanish-bg.png"],
    [/argentinian|argentina/i, "argentinian-spanish-bg.png"],
    [/mexican|mexico|méxico/i, "mexican-spanish-bg.png"],
    [/dominican|dominican republic|dominicana/i, "dominican-spanish-bg.png"],
    [/peruvian|peru|perú/i, "peruvian-spanish-bg.png"],
    [/cuban|cuba/i, "cuban-spanish-bg.png"],
    [/andalusian|andalusia|andaluc/i, "andalusian-spanish-bg.png"],
    [/puerto.?rican|puerto rico/i, "puerto-rican-spanish-bg.png"],
  ];

  const match = backgroundByNeedle.find(([pattern]) => pattern.test(lookupText));
  if (!match) return null;

  const imagePath = path.join(projectRoot, "public", "images", "dialect-backgrounds", match[1]);
  return fs.existsSync(imagePath) ? imagePath : null;
}

function startLocalFileServer(filePath: string, backgroundImagePath?: string | null): Promise<LocalFileServer> {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    const absoluteBackgroundPath = backgroundImagePath ? path.resolve(backgroundImagePath) : null;
    const server = http.createServer((request, response) => {
      if (request.url === "/audio.mp3") {
        streamFile(absolutePath, request, response);
        return;
      }

      if (request.url === "/background" && absoluteBackgroundPath) {
        streamFile(absoluteBackgroundPath, request, response);
        return;
      }

      if (request.url !== "/audio.mp3") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
    });

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not start local audio server for Remotion."));
        return;
      }

      resolve({
        url: `http://127.0.0.1:${address.port}/audio.mp3`,
        backgroundUrl: absoluteBackgroundPath ? `http://127.0.0.1:${address.port}/background` : undefined,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => {
              if (error) {
                closeReject(error);
                return;
              }

              closeResolve();
            });
          }),
      });
    });
  });
}

export async function renderLessonVideo(
  timeline: LessonTimeline,
  audioPath: string,
  outputPath: string,
  callbacks: GeneratorCallbacks = {},
): Promise<void> {
  callbacks.onProgress?.({
    stage: "video",
    message: "Bundling Remotion video template",
    percent: 60,
  });

  const serveUrl = await bundle({
    entryPoint: remotionEntry,
    rootDir: projectRoot,
    onProgress: (progress) => {
      if (progress === 1) {
        console.log("Remotion bundle ready.");
        callbacks.onProgress?.({
          stage: "video",
          message: "Remotion bundle ready",
          percent: 64,
          raw: "Remotion bundle ready.",
        });
      }
    },
  });

  const backgroundImagePath = getDialectBackgroundImagePath(timeline);
  const audioServer = await startLocalFileServer(audioPath, backgroundImagePath);

  try {
    callbacks.onProgress?.({
      stage: "video",
      message: "Starting local audio server for Remotion",
      percent: 65,
      raw: `Serving audio to Remotion from ${audioServer.url}${audioServer.backgroundUrl ? ` and background from ${audioServer.backgroundUrl}` : ""}`,
    });

    const inputProps = {
      timeline,
      audioSrc: audioServer.url,
      backgroundImageSrc: audioServer.backgroundUrl,
    };

    callbacks.onProgress?.({
      stage: "video",
      message: "Selecting Remotion composition",
      percent: 66,
    });

    const composition = await selectComposition({
      serveUrl,
      id: "Pu3nteLessonVideo",
      inputProps,
    });

    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      audioCodec: "aac",
      outputLocation: outputPath,
      inputProps,
      overwrite: true,
      enforceAudioTrack: true,
      onProgress: ({ progress }) => {
        const percent = Math.round(progress * 100);
        const overallPercent = 66 + progress * 32;
        callbacks.onProgress?.({
          stage: "video",
          message: `Rendering MP4 frames and audio: ${percent}%`,
          percent: overallPercent,
          current: percent,
          total: 100,
          raw: `[remotion] render ${percent}%`,
        });
        if (percent % 10 === 0) {
          process.stdout.write(`\rRendering video: ${percent}%`);
        }
      },
    });
  } finally {
    await audioServer.close();
  }

  process.stdout.write("\n");
}
