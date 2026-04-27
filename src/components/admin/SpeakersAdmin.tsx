import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";
import { speakerFallbackImage } from "@/lib/speakerImages";
import { SortableList, SortableItem } from "./Sortable";
import { Trash2, Plus } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  linkedin: string | null;
  virtual: boolean;
  featured: boolean;
  sort_order: number;
  is_active: boolean;
}

export const SpeakersAdmin = () => {
  const [items, setItems] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("speakers").select("*").order("sort_order");
    setItems((data ?? []) as Speaker[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addNew = async () => {
    const { data } = await supabase
      .from("speakers")
      .insert({ name: "New speaker", role: "Affiliation", sort_order: items.length + 1 })
      .select()
      .single();
    if (data) setItems([...items, data as Speaker]);
  };

  const update = async (id: string, patch: Partial<Speaker>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    await supabase.from("speakers").update(patch).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this speaker?")) return;
    await supabase.from("speakers").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  };

  const reorder = async (next: Speaker[]) => {
    const withOrder = next.map((s, idx) => ({ ...s, sort_order: idx }));
    setItems(withOrder);
    await Promise.all(
      withOrder.map((s) => supabase.from("speakers").update({ sort_order: s.sort_order }).eq("id", s.id))
    );
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Drag the handle to reorder. <strong>Featured</strong> speakers appear on the landing page (max 7 recommended).
        </p>
        <button onClick={addNew} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-sm bg-foreground text-background">
          <Plus className="w-4 h-4" /> Add speaker
        </button>
      </div>
      <SortableList items={items} onReorder={reorder}>
        {(s) => (
          <SortableItem
            key={s.id}
            id={s.id}
            className="rounded-sm border border-input bg-card p-4 grid grid-cols-1 md:grid-cols-[auto,auto,1fr,1fr,1fr,auto] gap-3 items-start mb-3"
          >
            <ImageUpload value={s.image_url} onChange={(url) => update(s.id, { image_url: url })} folder="speakers" />
            <input
              className="px-3 py-2 rounded-sm border border-input bg-background text-sm"
              value={s.name}
              onChange={(e) => update(s.id, { name: e.target.value })}
              placeholder="Name"
            />
            <input
              className="px-3 py-2 rounded-sm border border-input bg-background text-sm"
              value={s.role}
              onChange={(e) => update(s.id, { role: e.target.value })}
              placeholder="Role / Affiliation"
            />
            <input
              className="px-3 py-2 rounded-sm border border-input bg-background text-sm"
              value={s.linkedin ?? ""}
              onChange={(e) => update(s.id, { linkedin: e.target.value || null })}
              placeholder="LinkedIn URL"
            />
            <div className="flex flex-col gap-1.5 text-xs">
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={s.featured} onChange={(e) => update(s.id, { featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={s.virtual} onChange={(e) => update(s.id, { virtual: e.target.checked })} />
                Virtual
              </label>
              <label className="flex items-center gap-1" title="Uncheck to hide from the public site without deleting">
                <input type="checkbox" checked={s.is_active} onChange={(e) => update(s.id, { is_active: e.target.checked })} />
                Visible
              </label>
              <button onClick={() => remove(s.id)} className="text-destructive hover:opacity-70 self-start mt-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </SortableItem>
        )}
      </SortableList>
    </div>
  );
};
