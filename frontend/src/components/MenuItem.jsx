export default function MenuItem({ text, active = false, icon }) {
  return (
    <div
      className={`px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition ${
        active
          ? "bg-emerald-100 text-emerald-800"
          : "text-slate-600 hover:bg-emerald-50"
      }`}
    >
      {icon} {text}
    </div>
  );
}