import { z } from "zod";

const phrase = z.object({
  text: z.string().min(1).max(100),
  latin: z.string().min(1).max(100).optional(),
  meaning: z.string().min(1).max(120).optional(),
}).strict();

const heading = { title: z.string().min(1).max(90), note: z.string().max(180).optional() };

export const grammarBoardSchema = z.discriminatedUnion("kind", [
  z.object({
    ...heading,
    kind: z.literal("table"),
    columns: z.array(z.string().min(1).max(36)).min(2).max(3),
    rows: z.array(z.array(phrase).min(2).max(3)).min(1).max(6),
    highlightRow: z.number().int().min(0).optional(),
  }).strict(),
  z.object({
    ...heading,
    kind: z.literal("pattern"),
    parts: z.array(phrase).min(2).max(5),
    result: phrase.optional(),
    highlightPart: z.number().int().min(0).optional(),
  }).strict(),
  z.object({
    ...heading,
    kind: z.literal("contrast"),
    cards: z.array(z.object({ label: z.string().min(1).max(45), phrase }).strict()).length(2),
  }).strict(),
  z.object({
    ...heading,
    kind: z.literal("timeline"),
    events: z.array(z.object({ label: z.string().min(1).max(45), phrase }).strict()).min(2).max(3),
    highlightEvent: z.number().int().min(0).optional(),
  }).strict(),
  z.object({
    ...heading,
    kind: z.literal("example"),
    phrase,
    choices: z.array(phrase).min(2).max(3).optional(),
  }).strict(),
]).superRefine((board, context) => {
  if (board.kind === "table") {
    if (board.rows.flat().some((cell) => cell.text.length > 45 || (cell.latin?.length ?? 0) > 50 || (cell.meaning?.length ?? 0) > 60)) {
      context.addIssue({ code: "custom", message: "Keep table cells readable: text up to 45 characters, latin up to 50, meaning up to 60. Split longer content into another board." });
    }
    if (board.rows.length > 4 && board.rows.flat().some((cell) => cell.latin || cell.meaning)) {
      context.addIssue({ code: "custom", message: "Tables with transliterations or meanings inside cells need at most four rows. Split the paradigm across boards so all three lines stay readable." });
    }
    if (board.rows.some((row) => row.length !== board.columns.length)) {
      context.addIssue({ code: "custom", message: "Every table row must match the column count." });
    }
    if (board.highlightRow !== undefined && board.highlightRow >= board.rows.length) {
      context.addIssue({ code: "custom", message: "highlightRow must identify an existing row (zero based)." });
    }
  }
  if (board.kind === "pattern" && board.highlightPart !== undefined && board.highlightPart >= board.parts.length) {
    context.addIssue({ code: "custom", message: "highlightPart must identify an existing part (zero based)." });
  }
  if (board.kind === "pattern" && board.parts.some((part) => part.text.length > 35 || (part.latin?.length ?? 0) > 40 || (part.meaning?.length ?? 0) > 55)) {
    context.addIssue({ code: "custom", message: "Keep pattern parts short: text up to 35 characters, latin up to 40, meaning up to 55." });
  }
  if (board.kind === "timeline" && board.highlightEvent !== undefined && board.highlightEvent >= board.events.length) {
    context.addIssue({ code: "custom", message: "highlightEvent must identify an existing event (zero based)." });
  }
});

export type GrammarBoard = z.infer<typeof grammarBoardSchema>;
export type GrammarPhrase = z.infer<typeof phrase>;

export function getGrammarDurationIssue(durationMs: number): string | undefined {
  if (durationMs < 540_000 || durationMs > 660_000) {
    return `Grammar lesson duration is ${(durationMs / 60_000).toFixed(1)} minutes; target 9–11 minutes. Adjust teaching content and realistic practice pauses, then run Dry Run again.`;
  }
  return undefined;
}

export function getGrammarSpeechIssue(text: string): string | undefined {
  if (/(^|[\s("'“«])[-–][\p{L}]+|[\p{L}]+[-–](?=$|[\s)"'”».,])|\b(?:ma|ka|ta)-[\p{L}]+(?:-sh|-ch)?\b/u.test(text)) {
    return "Keep affixes such as -as on the grammar board. Explain the change in full words and model a complete word or sentence with a target-language voice.";
  }
  if (/[=+→]|\*\*|<\/?(?:phoneme|break|speak)\b|\b(?:[a-z]\d[a-z]|[a-z]+\/[a-z]+)\b/iu.test(text)) {
    return "Spoken text must contain natural sentences, without formulas, transliteration numbers, slash alternatives, Markdown or SSML. Put notation on the grammar board.";
  }
  return undefined;
}
