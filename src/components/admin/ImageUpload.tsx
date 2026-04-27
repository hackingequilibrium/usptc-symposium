import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
  fallback?: string | null;
}

export const ImageUpload = ({ value, onChange, folder, fallback }: Props) => {
  const preview = value || fallback || null;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setBusy(true);
    setError("");
    try {
      const ext = file.name.split(".").pop() ?? "png";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("cms-assets")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("cms-assets").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {preview && (
          <img src={preview} alt="" className="w-16 h-16 object-cover border border-input rounded-sm bg-white" />
        )}
        <label className="cursor-pointer text-xs px-3 py-2 rounded-sm border border-input hover:bg-muted">
          {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Remove
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
