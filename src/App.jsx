import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import ItemCard from "./components/ItemCard";
import ClaimModal from "./components/ClaimModal";
import ReportForm from "./components/ReportForm";

function App() {
  const backend = import.meta.env.VITE_BACKEND_URL || "";
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [openClaim, setOpenClaim] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const url = new URL(`${backend}/api/items`);
      if (query) url.searchParams.set("q", query);
      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);
  useEffect(() => { const t = setTimeout(fetchItems, 300); return () => clearTimeout(t); }, [query]);

  const openClaimModal = (item) => { setSelected(item); setOpenClaim(true); };
  const submitClaim = async ({ claimant_name, claimant_email, message }) => {
    try {
      const res = await fetch(`${backend}/api/items/${selected.id}/claims`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimant_name, claimant_email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to submit claim");
      setOpenClaim(false);
      alert("Claim submitted! We'll review it soon.");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_40%)] pointer-events-none" />

      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-sky-500/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white font-bold text-xl">Lost & Found</div>
          <a href="#report" className="px-3 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400">Report Item</a>
        </div>
      </header>

      <main>
        <Hero onSearch={setQuery} />

        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-white text-xl font-semibold mb-4">Recently Reported</h2>
          {loading ? (
            <div className="text-slate-300">Loading items...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} onClaim={openClaimModal} />
              ))}
            </div>
          )}
        </section>

        <section id="report" className="max-w-6xl mx-auto px-6 pb-24">
          <ReportForm onCreated={() => { fetchItems(); }} />
        </section>
      </main>

      <footer className="border-t border-sky-500/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-slate-400 text-sm">
          Built with modern stack • Responsive and accessible
        </div>
      </footer>

      <ClaimModal open={openClaim} item={selected} onClose={() => setOpenClaim(false)} onSubmit={submitClaim} />
    </div>
  );
}

export default App;
