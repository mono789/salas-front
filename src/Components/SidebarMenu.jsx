import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function SidebarMenu(){
    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='bg-success col-auto col-md-3 min-vh-100'>
                    <a className='text-decoration-none text-white d-flex align-itemcenter'>
                        <span className='ms-1 fs-4'>Inicio</span>
                    </a>
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item text-white fs-4">
                            <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                <i className='bi bi-table'></i>
                                <span className='ms-2'>Salas Disponibles</span>
                            </a>
                        </li>
                        <li className="nav-item text-white fs-4">
                            <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                <i className='bi bi-table'></i>
                                <span className='ms-2'>Software Dispoble</span>
                            </a>
                        </li>
                        <li className="nav-item text-white fs-4">
                            <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                <i className='bi bi-grid'></i>
                                <span className='ms-2'>Generar Reserva</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default SidebarMenu

