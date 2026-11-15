import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-8 text-center text-[#64736F]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#008F53] animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#142A27]">
          Loading Console...
        </p>
      </div>
    </div>
  );
}
