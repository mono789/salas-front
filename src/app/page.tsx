import SidebarMenu from "../Layout/SidebarMenu";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Index } from "@/Pages/Index";
import { Tittle } from "@/Pages/Tittle";

export default function Home() {
  return (
    <div className="container-left">
      <div className="row">
        <div className="col-6">
          <SidebarMenu />
        </div>
        <div className="col-6">
          <Tittle />
          <Index />
          </div>
      </div>
    </div>
  );
}
