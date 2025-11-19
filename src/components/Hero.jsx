import { Search } from "lucide-react";

export default function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Lost & Found
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-sky-200/90">
            Report lost items, browse found belongings, and submit a claim to verify ownership.
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, category, or location..."
                className="w-full rounded-xl bg-slate-800/70 border border-sky-500/30 text-white placeholder-slate-400 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                onChange={(e) => onSearch?.(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300" size={22} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
