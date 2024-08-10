import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/common/MainNavbar";

function App() {
  return (
    // main wrapper
    <div className="mx-auto h-screen w-screen min-w-minContent max-w-maxContent bg-richblack-900">
      {/* ===== main nav bar ===== */}
      <MainNavbar />

      {/* ===== all pages will be rendered below ===== */}
      <main
        className="mx-auto h-[calc(100vh-4rem)] w-full min-w-minContent max-w-maxContent
       overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
