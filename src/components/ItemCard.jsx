import { Tag, MapPin, CalendarDays, Mail, User } from "lucide-react";

export default function ItemCard({ item, onClaim }) {
  return (
    <div className="group bg-slate-800/60 border border-sky-500/20 rounded-2xl overflow-hidden hover:border-sky-400/40 transition">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-slate-700/50 flex items-center justify-center text-slate-300">
          No image
        </div>
      )}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold text-lg">{item.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-sky-500/20 text-sky-300 capitalize">
            {item.status}
          </span>
        </div>
        {item.description && (
          <p className="mt-2 text-slate-300/90 line-clamp-2">{item.description}</p>
        )}
        <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300 text-sm">
          <div className="flex items-center gap-2"><Tag size={16}/> {item.category}</div>
          <div className="flex items-center gap-2"><MapPin size={16}/> {item.location}</div>
          {item.date && <div className="flex items-center gap-2 col-span-2"><CalendarDays size={16}/> {new Date(item.date).toLocaleDateString()}</div>}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <User size={14}/> {item.reporter_name}
            <Mail size={14}/> {item.reporter_email}
          </div>
          <button
            disabled={item.status === 'claimed'}
            onClick={() => onClaim?.(item)}
            className="ml-3 inline-flex items-center px-3 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}
