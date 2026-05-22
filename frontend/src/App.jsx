import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import Mascotas from "./pages/Mascotas";
import Solicitudes from "./pages/Solicitudes";
import Usuarios from "./pages/Usuarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirección */}
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" />}
        />

        {/* Layout Admin */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="mascotas" element={<Mascotas />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="usuarios" element={<Usuarios />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}



export default App;