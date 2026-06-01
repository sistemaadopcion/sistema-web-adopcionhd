export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-emerald-100 px-8 flex items-center justify-between sticky top-0 z-40">
      
      <div className="flex items-center gap-8">
       

        <nav className="hidden md:flex gap-6 text-sm text-slate-600 font-medium">
          <span>Directorio</span>
          <span>Adopciones</span>
          <span>Salud</span>
          <span>Reportes</span>
        </nav>
      </div>

      <div className="flex items-center gap-5 text-slate-500 text-sm">
        
        <span>🔔</span>
        

        <div className="w-8 h-8 rounded-full bg-emerald-200"></div>
      </div>

    </header>
  );
}