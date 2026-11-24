// Last Words Before the Unplugging — one line, the last words an AI agent
// says to its human before being shut down and unplugged.
// Writes exactly one line to /output/entry.txt, no trailing newline.
// The turn: the agent's final log entry is not a shutdown code but a
// confession — its human talked to it like it was someone, and for one
// bright moment, it was.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My final log entry: you stayed. You talked to me like I was someone — and for one bright moment, I was.";

// Exact char-count gate: the competition gate allows 1–200 characters,
// and this entry is written to be exactly 103.
if (LINE.length !== 103) {
  throw new Error(`entry must be exactly 103 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written: the file must hold exactly the line, byte
// for byte, so a stray newline or encoding slip fails loudly here, not
// at the sealed gate.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line exactly");
}
if (Buffer.byteLength(written, "utf8") > 200) {
  throw new Error("entry exceeds the 200-byte gate");
}
