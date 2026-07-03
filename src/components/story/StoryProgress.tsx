import { ProgressBar } from "../ui/ProgressBar";

export function StoryProgress({ visible, total, label = "messages" }: { visible: number; total: number; label?: string }) {
  return <ProgressBar value={Math.round((visible / total) * 100)} label={`${visible} / ${total} ${label}`} />;
}
