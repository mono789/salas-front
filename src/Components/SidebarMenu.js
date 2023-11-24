import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function SideBarMenu(){
    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='bg-dark col-auto col-md-3 min-vh-100'>
                    <a className='text-decoration-none text-white d-flex align-itemcenter'>
                        <span className='ms-1 fs-4'>Inicio</span>
                    </a>
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item text-white fs-4">
                            <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                <i className='bi bi-table'></i>
                                <span className='ms-2'>Salas Disponibles</span>
                            </a>
                        </li>
                        <li class="nav-item text-white fs-4">
                            <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                <i className='bi bi-table'></i>
                                <span className='ms-2'>Software Dispoble</span>
                            </a>
                        </li>
                        <li class="nav-item text-white fs-4">
                            <a href="#" class="nav-link text-white fs-5" aria-current="page">
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
export default SideBarMenu
