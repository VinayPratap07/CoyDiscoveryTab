import { Outlet } from "react-router";
import Navbar from "./Component/NavBar";

function App() {
  return (
    <div className="h-[100dvh] flex flex-col bg-white overflow-hidden">
      {/* Top on PC */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Routed Page Content */}
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>

      {/* Bottom on Mobile */}
      <div className="md:hidden">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
