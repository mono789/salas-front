import { Index } from "@/Pages/Index";
import { Tittle } from "@/Pages/Tittle";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import SidebarMenu from "../Layout/SidebarMenu";

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
