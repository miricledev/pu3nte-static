import type { CSSProperties } from "react";
import type { GrammarBoard as Board, GrammarPhrase } from "../../src/grammarSchema";

const panel: CSSProperties = { border: "1px solid #33506a", borderRadius: 16, background: "#101f34", padding: 20, minWidth: 0 };
const glow = { background: "#173f51", borderColor: "#00baf2", boxShadow: "inset 4px 0 #00baf2" };

function Phrase({ phrase, compact = false, dense = false }: { phrase: GrammarPhrase; compact?: boolean; dense?: boolean }) {
  return <div style={{ minWidth: 0, overflowWrap: "anywhere" }}>
    <div dir="auto" style={{ fontSize: dense ? 24 : compact ? 27 : 38, fontWeight: 750, lineHeight: 1.25, whiteSpace: "pre-wrap" }}>{phrase.text}</div>
    {phrase.latin && <div dir="ltr" style={{ color: "#69ddff", fontSize: dense ? 18 : compact ? 21 : 27, marginTop: 4 }}>{phrase.latin}</div>}
    {phrase.meaning && <div dir="auto" style={{ color: "#d0d9ea", fontSize: dense ? 17 : compact ? 20 : 25, marginTop: 4 }}>{phrase.meaning}</div>}
  </div>;
}

export const GrammarBoard = ({ board }: { board: Board }) => <div style={{ display: "grid", gap: 18, minWidth: 0 }}>
  <div dir="auto" style={{ fontSize: 35, fontWeight: 850, color: "#ffd447", lineHeight: 1.2 }}>{board.title}</div>
  {board.kind === "table" && <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 5px", tableLayout: "fixed" }}>
    <thead><tr>{board.columns.map((column, index) => <th key={index} dir="auto" style={{ padding: "6px 14px", textAlign: "start", fontSize: 23, color: "#69ddff" }}>{column}</th>)}</tr></thead>
    <tbody>{board.rows.map((row, rowIndex) => <tr key={rowIndex}>
      {row.map((cell, columnIndex) => <td key={columnIndex} style={{ background: board.highlightRow === rowIndex ? "#18465a" : "#101f34", borderTop: `1px solid ${board.highlightRow === rowIndex ? "#00baf2" : "#33506a"}`, padding: "8px 14px", verticalAlign: "middle" }}><Phrase phrase={cell} compact dense={board.rows.length > 3} /></td>)}
    </tr>)}</tbody>
  </table>}
  {board.kind === "pattern" && <>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, direction: /[\u0600-\u06ff]/u.test(board.parts[0].text) ? "rtl" : "ltr" }}>{board.parts.map((part, index) => <div key={index} style={{ ...panel, flex: "1 1 190px", ...(board.highlightPart === index ? glow : {}) }}><Phrase phrase={part} compact /></div>)}</div>
    {board.result && <div style={{ ...panel, borderColor: "#38e38b" }}><Phrase phrase={board.result} /></div>}
  </>}
  {board.kind === "contrast" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>{board.cards.map((card, index) => <div key={index} style={{ ...panel, borderTop: `4px solid ${index ? "#b9a7ff" : "#00baf2"}` }}>
    <div dir="auto" style={{ fontSize: 25, color: "#ffd447", marginBottom: 22 }}>{card.label}</div><Phrase phrase={card.phrase} />
  </div>)}</div>}
  {board.kind === "timeline" && <div style={{ display: "grid", gridTemplateColumns: `repeat(${board.events.length}, 1fr)`, gap: 20, borderTop: "4px solid #00baf2", paddingTop: 22 }}>{board.events.map((event, index) => <div key={index} style={{ ...panel, ...(board.highlightEvent === index ? glow : {}) }}>
    <div dir="auto" style={{ color: "#ffd447", fontSize: 25, marginBottom: 24 }}>{event.label}</div><Phrase phrase={event.phrase} compact />
  </div>)}</div>}
  {board.kind === "example" && <>
    <div style={{ ...panel, padding: 30 }}><Phrase phrase={board.phrase} /></div>
    {board.choices && <div style={{ display: "grid", gridTemplateColumns: `repeat(${board.choices.length}, 1fr)`, gap: 18 }}>{board.choices.map((choice, index) => <div key={index} style={panel}><div style={{ fontSize: 22, color: "#ffd447", marginBottom: 10 }}>{index + 1}</div><Phrase phrase={choice} compact /></div>)}</div>}
  </>}
  {board.note && <div dir="auto" style={{ color: "#d0d9ea", fontSize: 25, lineHeight: 1.3, borderInlineStart: "4px solid #b9a7ff", paddingInlineStart: 16 }}>{board.note}</div>}
</div>;
