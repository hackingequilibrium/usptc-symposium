import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "./ImageUpload";
import { SortableList, SortableItem } from "./Sortable";
import { Trash2, Plus } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  category: string;
  sort_order: number;
  is_active: boolean;
}

const CATEGORIES = ["Organizers", "Strategic Partners", "Honorary Patrons"];

export const PartnersAdmin = () => {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("category")
      .order("sort_order");
    setItems((data ?? []) as Partner[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addNew = async () => {
    const { data } = await supabase
      .from("partners")
      .insert({ name: "New partner", category: "Strategic Partners", sort_order: items.length })
      .select()
      .single();
    if (data) setItems([...items, data as Partner]);
  };

  const update = async (id: string, patch: Partial<Partner>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    await supabase.from("partners").update(patch).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this partner?")) return;
    await supabase.from("partners").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  };

  const reorderCategory = async (cat: string, reordered: Partner[]) => {
    const others = items.filter((i) => i.category !== cat);
    const withOrder = reordered.map((p, idx) => ({ ...p, sort_order: idx }));
    setItems([...others, ...withOrder]);
    await Promise.all(
      withOrder.map((p) => supabase.from("partners").update({ sort_order: p.sort_order }).eq("id", p.id))
    );
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Drag the handle to reorder partners within a category.</p>
        <button onClick={addNew} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-sm bg-foreground text-background">
          <Plus className="w-4 h-4" /> Add partner
        </button>
      </div>
      {CATEGORIES.map((cat) => {
        const inCat = items.filter((i) => i.category === cat);
        return (
          <div key={cat}>
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-navy mb-3">{cat}</h3>
            <div className="space-y-3">
              <SortableList items={inCat} onReorder={(next) => reorderCategory(cat, next)}>
                {(p) => (
                  <SortableItem
                    key={p.id}
                    id={p.id}
                    className="rounded-sm border border-input bg-card p-4 grid grid-cols-1 md:grid-cols-[auto,auto,1fr,1fr,auto,auto] gap-3 items-start"
                  >
                    <ImageUpload value={p.logo_url} onChange={(url) => update(p.id, { logo_url: url })} folder="partners" />
                    <input
                      className="px-3 py-2 rounded-sm border border-input bg-background text-sm"
                      value={p.name}
                      onChange={(e) => update(p.id, { name: e.target.value })}
                      placeholder="Partner name"
                    />
                    <input
                      className="px-3 py-2 rounded-sm border border-input bg-background text-sm"
                      value={p.url ?? ""}
                      onChange={(e) => update(p.id, { url: e.target.value || null })}
                      placeholder="https://…"
                    />
                    <select
                      className="px-3 py-2 rounded-sm border border-input bg-background text-sm"
                      value={p.category}
                      onChange={(e) => update(p.id, { category: e.target.value })}
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1 text-xs">
                        <input type="checkbox" checked={p.is_active} onChange={(e) => update(p.id, { is_active: e.target.checked })} />
                        Active
                      </label>
                      <button onClick={() => remove(p.id)} className="text-destructive hover:opacity-70">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </SortableItem>
                )}
              </SortableList>
            </div>
          </div>
        );
      })}
    </div>
  );
};
