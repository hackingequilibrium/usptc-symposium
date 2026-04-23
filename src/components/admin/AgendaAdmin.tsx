import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SortableList, SortableItem } from "./Sortable";
import { Trash2, Plus } from "lucide-react";

interface Day {
  id: string;
  label: string;
  date_text: string;
  location: string;
  subtitle: string;
  sort_order: number;
}

interface Item {
  id: string;
  day_id: string;
  time_text: string;
  title: string;
  description: string | null;
  bullets: string[];
  sort_order: number;
}

export const AgendaAdmin = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [d, i] = await Promise.all([
      supabase.from("agenda_days").select("*").order("sort_order"),
      supabase.from("agenda_items").select("*").order("sort_order"),
    ]);
    setDays((d.data ?? []) as Day[]);
    setItems((i.data ?? []) as Item[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addDay = async () => {
    const { data } = await supabase.from("agenda_days").insert({
      label: "New Day", date_text: "TBD", location: "TBD", subtitle: "Subtitle", sort_order: days.length,
    }).select().single();
    if (data) setDays([...days, data as Day]);
  };

  const updateDay = async (id: string, patch: Partial<Day>) => {
    setDays(days.map((d) => (d.id === id ? { ...d, ...patch } : d)));
    await supabase.from("agenda_days").update(patch).eq("id", id);
  };

  const removeDay = async (id: string) => {
    if (!confirm("Delete this entire day and its items?")) return;
    await supabase.from("agenda_days").delete().eq("id", id);
    setDays(days.filter((d) => d.id !== id));
    setItems(items.filter((i) => i.day_id !== id));
  };

  const reorderDays = async (next: Day[]) => {
    const withOrder = next.map((d, idx) => ({ ...d, sort_order: idx }));
    setDays(withOrder);
    await Promise.all(
      withOrder.map((d) => supabase.from("agenda_days").update({ sort_order: d.sort_order }).eq("id", d.id))
    );
  };

  const addItem = async (dayId: string) => {
    const dayItems = items.filter((i) => i.day_id === dayId);
    const { data } = await supabase.from("agenda_items").insert({
      day_id: dayId, time_text: "TBD", title: "New session", sort_order: dayItems.length + 1,
    }).select().single();
    if (data) setItems([...items, data as Item]);
  };

  const updateItem = async (id: string, patch: Partial<Item>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    await supabase.from("agenda_items").update(patch).eq("id", id);
  };

  const removeItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("agenda_items").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  };

  const reorderItems = async (dayId: string, next: Item[]) => {
    const others = items.filter((i) => i.day_id !== dayId);
    const withOrder = next.map((it, idx) => ({ ...it, sort_order: idx }));
    setItems([...others, ...withOrder]);
    await Promise.all(
      withOrder.map((it) => supabase.from("agenda_items").update({ sort_order: it.sort_order }).eq("id", it.id))
    );
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Drag the handle to reorder days and sessions.</p>
        <button onClick={addDay} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-sm bg-foreground text-background">
          <Plus className="w-4 h-4" /> Add day
        </button>
      </div>
      <SortableList items={days} onReorder={reorderDays}>
        {(day) => (
          <SortableItem
            key={day.id}
            id={day.id}
            className="rounded-sm border border-input bg-card p-5 mb-6 grid grid-cols-[auto,1fr] gap-4 items-start"
            handleClassName="mt-2"
          >
            <div className="space-y-4 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="px-3 py-2 rounded-sm border border-input bg-background text-sm" value={day.label} onChange={(e) => updateDay(day.id, { label: e.target.value })} placeholder="Label (e.g. Day 1)" />
                <input className="px-3 py-2 rounded-sm border border-input bg-background text-sm" value={day.date_text} onChange={(e) => updateDay(day.id, { date_text: e.target.value })} placeholder="Date text (e.g. June 1)" />
                <input className="px-3 py-2 rounded-sm border border-input bg-background text-sm md:col-span-2" value={day.subtitle} onChange={(e) => updateDay(day.id, { subtitle: e.target.value })} placeholder="Subtitle" />
                <input className="px-3 py-2 rounded-sm border border-input bg-background text-sm md:col-span-2" value={day.location} onChange={(e) => updateDay(day.id, { location: e.target.value })} placeholder="Location" />
                <button onClick={() => removeDay(day.id)} className="text-destructive hover:opacity-70 text-xs flex items-center gap-1 justify-self-start">
                  <Trash2 className="w-3.5 h-3.5" /> Delete day
                </button>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <SortableList items={items.filter((i) => i.day_id === day.id)} onReorder={(next) => reorderItems(day.id, next)}>
                  {(item) => (
                    <SortableItem
                      key={item.id}
                      id={item.id}
                      className="grid grid-cols-[auto,140px,1fr,auto] gap-2 items-start p-3 rounded-sm bg-muted/40 mb-2"
                      handleClassName="mt-2"
                    >
                      <input className="px-2 py-1.5 rounded-sm border border-input bg-background text-xs font-mono" value={item.time_text} onChange={(e) => updateItem(item.id, { time_text: e.target.value })} placeholder="Time" />
                      <div className="space-y-1.5 min-w-0">
                        <input className="w-full px-2 py-1.5 rounded-sm border border-input bg-background text-sm" value={item.title} onChange={(e) => updateItem(item.id, { title: e.target.value })} placeholder="Title" />
                        <textarea className="w-full px-2 py-1.5 rounded-sm border border-input bg-background text-xs" rows={2} value={item.description ?? ""} onChange={(e) => updateItem(item.id, { description: e.target.value || null })} placeholder="Description (optional)" />
                        <textarea
                          className="w-full px-2 py-1.5 rounded-sm border border-input bg-background text-xs"
                          rows={2}
                          value={item.bullets.join("\n")}
                          onChange={(e) => updateItem(item.id, { bullets: e.target.value.split("\n").filter(Boolean) })}
                          placeholder="Bullets (one per line, optional)"
                        />
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-destructive hover:opacity-70 mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </SortableItem>
                  )}
                </SortableList>
                <button onClick={() => addItem(day.id)} className="text-xs flex items-center gap-1 px-3 py-2 rounded-sm border border-dashed border-input hover:bg-muted">
                  <Plus className="w-3.5 h-3.5" /> Add item
                </button>
              </div>
            </div>
          </SortableItem>
        )}
      </SortableList>
    </div>
  );
};
