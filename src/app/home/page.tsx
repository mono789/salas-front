import RoomCard from '@/components/RoomCard'
import React from 'react'

const roomsData = [{ blockNumber: "Bloque 20", roomNumber: "20-331" },
  { blockNumber: "Bloque 20", roomNumber: "20-335" },];


const Page = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p>Esta página contiene funciones e información de interés general<br></br>
        De manera que lo que está aquí no hay que reservarlo a ningún usuario en particular.<br></br>
        Algunas de estas funciones son: Ver y filtrar salones por criterios generales,<br></br>
        poder visualizar al interior de estos salones la información general de estos.
        Esto incluye: software, horarios??, etc. 
        </p>

        {/*
        Legacy code a optimizar:

        <Sidebar />   Contiene acciones generales de la pantalla, debería poderse customizar dependiendo del usuario
        pero voy a intentar de momento poner lo esencial aquí. Si algo se define una por usuario xd
        
        
        
        
        */}

        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {roomsData.map((room, index) => (
                  <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <RoomCard
                      blockNumber={room.blockNumber}
                      roomNumber={room.roomNumber}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page