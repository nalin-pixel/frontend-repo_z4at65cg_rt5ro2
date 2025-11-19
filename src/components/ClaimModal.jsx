import { useState } from "react";

export default function ClaimModal({ open, item, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({ claimant_name: name, claimant_email: email, message });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="w-full sm:max-w-md bg-slate-900 border border-sky-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Claim: {item?.title}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            required
            placeholder="Your name"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="Your email"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            rows={4}
            placeholder="Add details to verify ownership..."
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-white placeholder-slate-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400">Submit Claim</button>
          </div>
        </form>
      </div>
    </div>
  );
}
