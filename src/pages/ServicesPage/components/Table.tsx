import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useUiStore } from "../../../hooks/useUiStore";
import { useServicesStore } from "../../../hooks/useServicesStore";
import { Service } from "../../../models/services";

export const Table = () => {
  const { openServiceModal } = useUiStore();
  const { services, setActiveService } = useServicesStore();

  const handleServiceClick = (service: Service) => {
    setActiveService(service);
    openServiceModal();
  };

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
            {services.map((service) => (
              <tr key={service.id}>
                <td className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  {service.cliente}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {format(
                    addDays(new Date(service.fecha), 1),
                    "do 'de' MMMM yyyy",
                    {
                      locale: es,
                    }
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.marca}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.falla}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text max-w-sm overflow-x-auto">
                  {service.piezas_cambiadas}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.costo_servicio}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.domicilio}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <p
                    onClick={() => handleServiceClick(service)}
                    className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    Editar
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
