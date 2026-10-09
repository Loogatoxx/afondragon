import { LoadingState } from "@/components/common/loading-state";

export default function Loading() {
  return <LoadingState variant="rows" rows={5} label="A carregar…" />;
}
