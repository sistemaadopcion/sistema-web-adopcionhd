import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#dff3e6] flex">
      
     
      <Sidebar />

    
      <div className="flex-1 ml-64">
        
        <Topbar />

        <main className="p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}