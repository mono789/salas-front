import React from "react";
import List from "./list";

/* TODO: De momento vamos a ignorar este componente y la funcionalidad de "solicitar que instalen componentes específicos en el salón"
yo supongo que es más importante y realizable filtrar por especificaciones más que pedirlas.

De todas formas como es posible que sea una funcionalidad, no elimino del todo esta página,
puede que en el futuro nos sirva para guiar un sistema de peticiones de specs.
*/
const Page = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="bg-cover bg-center py-8"
            style={{
              backgroundImage: "url('/assets/bottom.png')",
            }}
          >
            <h2 className="text-center mb-4 mt-8 text-lg font-semibold">
              ¡Hola usuario! Selecciona los elementos que necesitas que estén
              disponibles en la sala.
            </h2>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
