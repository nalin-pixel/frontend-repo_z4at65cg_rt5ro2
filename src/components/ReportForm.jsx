import { useState } from "react";

export default function ReportForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Electronics",
    location: "",
    date: "",
    image_url: "",
    reporter_name: "",
    reporter_email: "",
  });
  const [loading, setLoading] = useState(false);
  const backend = import.meta.env.VITE_BACKEND_URL || "";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backend}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "lost" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to create");
      onCreated?.(data);
      setForm({
        title: "",
        description: "",
        category: "Electronics",
        location: "",
        date: "",
        image_url: "",
        reporter_name: "",
        reporter_email: "",
      });
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-slate-800/60 border border-sky-500/20 rounded-2xl p-5">
      <h3 className="text-white font-semibold mb-3">Report a Lost Item</h3>
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Title" value={form.title} onChange={(e)=>set("title", e.target.value)} required />
        <input className="input" placeholder="Category" value={form.category} onChange={(e)=>set("category", e.target.value)} required />
        <input className="input" placeholder="Location" value={form.location} onChange={(e)=>set("location", e.target.value)} required />
        <input className="input" type="date" value={form.date} onChange={(e)=>set("date", e.target.value)} />
        <input className="input sm:col-span-2" placeholder="Image URL (optional)" value={form.image_url} onChange={(e)=>set("image_url", e.target.value)} />
        <textarea className="textarea sm:col-span-2" rows={3} placeholder="Description" value={form.description} onChange={(e)=>set("description", e.target.value)} />
        <input className="input" placeholder="Your name" value={form.reporter_name} onChange={(e)=>set("reporter_name", e.target.value)} required />
        <input className="input" type="email" placeholder="Your email" value={form.reporter_email} onChange={(e)=>set("reporter_email", e.target.value)} required />
        <div className="sm:col-span-2 flex justify-end gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-50">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
