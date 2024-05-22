import "bootstrap-icons/font/bootstrap-icons.json";
import "bootstrap/dist/css/bootstrap.css";

function SidebarMenu() {
  return (
    <div className="container">
      <div className="row">
        <div className="bg-success col-auto col-md-4 min-vh-100">
          <a className="text-decoration-none text-white d-flex align-itemcenter">
            <i className="bi bi-house fs-4"></i>
            <span className="ms-2 fs-4">Inicio</span>
          </a>
          <br></br>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item text-white fs-6">
              <a
                href="#"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-house-check"></i>
                <span className="ms-2">Salas Disponibles</span>
              </a>
            </li>
            <li className="nav-item text-white fs-6">
              <a
                href="#"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-pc-display-horizontal"></i>
                <span className="ms-2">Software Disponible</span>
              </a>
            </li>
            <li className="nav-item text-white fs-6">
              <a
                href="#"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-grid"></i>
                <span className="ms-2">Generar Reserva</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default SidebarMenu;
