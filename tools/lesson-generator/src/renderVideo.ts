import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { remotionEntry, projectRoot } from "./config";
import type { GeneratorCallbacks, LessonTimeline } from "./types";

type LocalFileServer = {
  url: string;
  close: () => Promise<void>;
};

function getContentType(filePath: string): string {
  if (filePath.toLowerCase().endsWith(".mp3")) {
    return "audio/mpeg";
  }

  return "application/octet-stream";
}

function startLocalFileServer(filePath: string): Promise<LocalFileServer> {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    const server = http.createServer((request, response) => {
      if (request.url !== "/audio.mp3") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const stat = fs.statSync(absolutePath);
      const range = request.headers.range;
      const contentType = getContentType(absolutePath);

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
        fs.createReadStream(absolutePath, { start, end }).pipe(response);
        return;
      }

      response.writeHead(200, {
        "accept-ranges": "bytes",
        "content-length": stat.size,
        "content-type": contentType,
      });
      fs.createReadStream(absolutePath).pipe(response);
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

  const audioServer = await startLocalFileServer(audioPath);

  try {
    callbacks.onProgress?.({
      stage: "video",
      message: "Starting local audio server for Remotion",
      percent: 65,
      raw: `Serving audio to Remotion from ${audioServer.url}`,
    });

    const inputProps = {
      timeline,
      audioSrc: audioServer.url,
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
