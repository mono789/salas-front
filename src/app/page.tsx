import SidebarMenu from "../Layout/SidebarMenu";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Index } from "@/Pages/Index";

export default function Home() {
  return (
    <div className="container-left">
      <div className="row">
        <div className="col-8">
          <SidebarMenu />
        </div>
        <div className="col-4">
          <Index />
        </div>
      </div>
    </div>
  );
}
