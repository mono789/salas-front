import RoomDescription from "@/components/description";

const Page = ({ params }: any) => {
  const { sala } = params;

  return (
    <div className="flex flex-col justify-around place-items-center md:flex-row p-3">
      <RoomDescription
        nombre="Sala 20-234"
        restricciones="No se permite el ingreso de alimentos"
        nEquipos="24"
        implementos="Tablero, video Beam, aire acondicionado, 24 sillas, 24 mesas"
        os="Windows 10 / Ubuntu 20.04"
        software="Microsoft Office 2019, Visual Studio Code, Google Chrome, Mozilla Firefox, Zoom, Microsoft Teams, R Studio, Python"
      />
      <div className="flex flex-col place-items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-5 md:ml-5 p-2">
        <h2 className="font-bold">Horario y Disponibilidad</h2>
        {/* 
        Se maneja un grid para representarlo, las celdas de Horas tienen la mitad de la longitud de las demás.
        Supongo yo que se puede obtener la disponibilidad y relacionar los días con las horas. Para posteriormente juntarlas en una fila
        Este componente de fila debería poder integrarse en el grip sin invonvenientes.
        */}
        <div className="grid grid-cols-7 col-span-5 gap-2 place-items-center">
          <div>Horas</div>
          <div className="col-span-2">Hoy</div>
          <div className="col-span-2">Mañana</div>
          <div className="col-span-2">Seleccionar fecha</div>
          <div>6am</div>
          <button className="bg-lime-500 dark:bg-teal-900 col-span-2 text-center rounded-full px-2">
            Libre
          </button>
          <button className="bg-orange-500 col-span-2 text-center rounded-full px-2">
            Ocupado
          </button>
          <button className="bg-amber-500 col-span-2 text-center rounded-full px-2">
            Reservado
          </button>
          <div>7am</div>
          <div className="bg-lime-500 dark:bg-teal-900 col-span-2 text-center rounded-full px-2">
            Libre
          </div>
          <div className="bg-orange-500 col-span-2 text-center rounded-full px-2">
            Ocupado
          </div>
          <div className="bg-amber-500 col-span-2 text-center rounded-full px-2">
            Reservado
          </div>
          <div>8am</div>
          <div className="bg-lime-500 dark:bg-teal-900 col-span-2 text-center rounded-full px-2">
            Libre
          </div>
          <div className="bg-orange-500 col-span-2 text-center rounded-full px-2">
            Ocupado
          </div>
          <div className="bg-amber-500 col-span-2 text-center rounded-full px-2">
            Reservado
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  /*TODO: Este elemento debe ser obtenido de forma dinámica cuando se hace build
  por lo que se necesita hacer fetch para obtener todas las salas(las cuales serán las posibles rutas)
  */
  const salas = ["sala1", "sala2", "sala3", "sala4"];

  return salas.map((sala) => ({
    sala: sala,
  }));
}

export default Page;
