import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useUiStore } from "../../../hooks/useUiStore";

const services = [
  {
    id: "1",
    cliente: "Juan Gonzales",
    fecha: "12/12/2022",
    marca: "Whirpool",
    falla: "Golpeaba la tina",
    piezas_cambiadas: "amortiguadores",
    costo_servicio: "400",
    domicilio: "Calle 123",
    user: {
      uid: "1",
      name: "Ulises",
    },
  },
  {
    id: "2",
    cliente: "Pwlon Bañuelos",
    fecha: "10/09/2022",
    marca: "GE",
    falla: "Tiraba agua",
    piezas_cambiadas: "Bomba de agua",
    costo_servicio: "700",
    domicilio: "Calle 456",
    user: {
      uid: "1",
      name: "Ulises",
    },
  },
];

export const Table = () => {
  const { openServiceModal } = useUiStore();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full divide-y-2 divide-gray-200 text-sm">
          <thead className="text-left ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Cliente
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Fecha
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Marca
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Falla
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Piezas cambiadas
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Se cobró
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Domicilio
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-text">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                {format(new Date(2014, 6, 27), "do 'de' MMMM yyyy", {
                  locale: es,
                })}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                Tiraba agua
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text max-w-sm overflow-x-auto">
                Actuador y sensor
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">$500</td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                Calle 123 # 45-67
              </td>

              <td className="whitespace-nowrap px-4 py-2">
                <p
                  onClick={() => openServiceModal()}
                  className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
                >
                  Editar
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
