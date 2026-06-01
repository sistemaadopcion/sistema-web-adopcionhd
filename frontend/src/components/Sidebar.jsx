import MenuItem from "./MenuItem";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#f5f7f6] border-r border-emerald-100 flex flex-col justify-between fixed left-0 top-0">
      
      <div>
        
        {/* LOGO */}
        <div className="p-6 flex items-center gap-3 border-b border-emerald-50">
          
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white text-lg">
            🐾
          </div>

          <div>
            <h2 className="font-bold text-emerald-900 text-sm">
              Can Martin Admin
            </h2>

            <p className="text-xs text-slate-500">
              Gestión Administrativa
            </p>
          </div>

        </div>

        {/* NAV */}
        <nav className="p-4 space-y-2">

          <NavLink to="/admin/dashboard">
            {({ isActive }) => (
              <MenuItem
                active={isActive}
                text="Dashboard"
                icon="▦"
              />
            )}
          </NavLink>

          <NavLink to="/admin/mascotas">
            {({ isActive }) => (
              <MenuItem
                active={isActive}
                text="Mascotas"
                icon="🐾"
              />
            )}
          </NavLink>

          <NavLink to="/admin/solicitudes">
            {({ isActive }) => (
              <MenuItem
                active={isActive}
                text="Solicitudes"
                icon="☰"
              />
            )}
          </NavLink>

          <NavLink to="/admin/usuarios">
            {({ isActive }) => (
              <MenuItem
                active={isActive}
                text="Usuarios"
                icon="👤"
              />
            )}
          </NavLink>

        </nav>

      </div>

      {/* FOOTER */}
      <div className="p-4 space-y-4">

        <button className="w-full bg-emerald-900 text-white py-3 rounded-xl font-semibold shadow-md">
          ＋ Nuevo Registro
        </button>

        <button className="w-full text-left text-slate-500 py-2 px-2 hover:text-emerald-700">
          ↩ Cerrar Sesión
        </button>

      </div>

    </aside>
  );
}