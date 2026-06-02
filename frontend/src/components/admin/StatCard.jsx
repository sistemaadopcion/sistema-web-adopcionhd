export default function StatCard({ title, value, badge }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-slate-400 font-semibold">
          {title}
        </span>

        <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
          {badge}
        </span>
      </div>

      <h3 className="text-5xl font-bold text-emerald-950">
        {value}
      </h3>
    </div>
  );
}