import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useUiStore } from "../../../hooks/useUiStore";
import { useServicesStore } from "../../../hooks/useServicesStore";
import { Service } from "../../../models/services";
import { formatterMoney } from "../../../utils";

export const Table = () => {
  const { openServiceModal } = useUiStore();
  const { services, setActiveService } = useServicesStore();
  const [filters, setFilters] = useState({
    cliente: "",
    fechaDesde: "",
    fechaHasta: "",
    marca: "",
    falla: "",
  });
  const [filteredServices, setFilteredServices] = useState(services);

  const handleServiceClick = (service: Service) => {
    setActiveService(service);
    openServiceModal();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value.toLowerCase(),
    }));
  };

  useEffect(() => {
    const filtered = services.filter((service) => {
      if (
        filters.cliente &&
        !service.cliente.toLowerCase().includes(filters.cliente)
      ) {
        return false;
      }
      if (
        filters.fechaDesde &&
        new Date(service.fecha) < new Date(filters.fechaDesde)
      ) {
        return false;
      }
      if (
        filters.fechaHasta &&
        new Date(service.fecha) > new Date(filters.fechaHasta)
      ) {
        return false;
      }
      if (
        filters.marca &&
        !service.marca.toLowerCase().includes(filters.marca)
      ) {
        return false;
      }
      if (
        filters.falla &&
        !service.falla.toLowerCase().includes(filters.falla)
      ) {
        return false;
      }
      return true;
    });
    setFilteredServices(filtered);
  }, [services, filters]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              name="cliente"
              value={filters.cliente}
              onChange={handleFilterChange}
              placeholder="Cliente"
              className="w-32 px-3 py-1 border rounded-md outline-none"
            />
            <div className="flex gap-3">
              <input
                type="date"
                name="fechaDesde"
                value={filters.fechaDesde}
                onChange={handleFilterChange}
                placeholder="Desde"
                className="w-32 px-3 py-1 border rounded-md outline-none"
              />
              <input
                type="date"
                name="fechaHasta"
                value={filters.fechaHasta}
                onChange={handleFilterChange}
                placeholder="Hasta"
                className="w-32 px-3 py-1 border rounded-md outline-none"
              />
            </div>
            <input
              type="text"
              name="marca"
              value={filters.marca}
              onChange={handleFilterChange}
              placeholder="Marca"
              className="w-32 px-3 py-1 border rounded-md outline-none"
            />
            <input
              type="text"
              name="falla"
              value={filters.falla}
              onChange={handleFilterChange}
              placeholder="Falla"
              className="w-32 px-3 py-1 border rounded-md outline-none"
            />
          </div>
        </div>

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
            {filteredServices.map((service) => (
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
                  {formatterMoney(service.costo_servicio)}
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
