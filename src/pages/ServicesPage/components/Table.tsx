import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useUiStore } from "../../../hooks/useUiStore";
import { useServicesStore } from "../../../hooks/useServicesStore";
import { Service } from "../../../models/services";
import { formatterMoney } from "../../../utils";
import { Pagination } from "../../../components/Pagination";

export const Table = () => {
  const { openServiceModal } = useUiStore();
  const { services, setActiveService, loadingServices } = useServicesStore();
  const [filters, setFilters] = useState({
    customer: "",
    dateFrom: "",
    dateTo: "",
    brand: "",
    fault: "",
  });
  const [filteredServices, setFilteredServices] = useState(services);
  const [currentPage, setCurrentPage] = useState(1);
  // @ts-ignore
  const [servicesPerPage, setServicesPerPage] = useState(20);

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
    setCurrentPage(1);
  };

  useEffect(() => {
    loadingServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) => {
      if (
        filters.customer &&
        !service.customer.toLowerCase().includes(filters.customer)
      ) {
        return false;
      }
      if (
        filters.dateFrom &&
        new Date(service.date) < new Date(filters.dateFrom)
      ) {
        return false;
      }
      if (filters.dateTo && new Date(service.date) > new Date(filters.dateTo)) {
        return false;
      }
      if (
        filters.brand &&
        !service.brand.toLowerCase().includes(filters.brand)
      ) {
        return false;
      }
      if (
        filters.fault &&
        !service.fault.toLowerCase().includes(filters.fault)
      ) {
        return false;
      }
      return true;
    });
    setFilteredServices(filtered);
  }, [services, filters]);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredServices.length / servicesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="">
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            name="customer"
            value={filters.customer}
            onChange={handleFilterChange}
            placeholder="Cliente"
            className="w-32 px-3 py-1 border rounded-md outline-none"
          />
          <div className="flex gap-3">
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              placeholder="Desde"
              className="w-32 px-3 py-1 border rounded-md outline-none"
            />
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              placeholder="Hasta"
              className="w-32 px-3 py-1 border rounded-md outline-none"
            />
          </div>
          <input
            type="text"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            placeholder="Marca"
            className="w-32 px-3 py-1 border rounded-md outline-none"
          />
          <input
            type="text"
            name="fault"
            value={filters.fault}
            onChange={handleFilterChange}
            placeholder="Falla"
            className="w-32 px-3 py-1 border rounded-md outline-none"
          />
        </div>
      </div>
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
            {currentServices.map((service) => (
              <tr key={service.id}>
                <td className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  {service.customer}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {format(
                    addDays(new Date(service.date), 1),
                    "do 'de' MMMM yyyy",
                    {
                      locale: es,
                    }
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.brand}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.fault}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text max-w-sm overflow-x-auto">
                  {service.changed_parts}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {formatterMoney(service.service_cost)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {service.address}
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
      <Pagination
        currentPage={currentPage}
        servicesPerPage={servicesPerPage}
        totalServices={filteredServices.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </>
  );
};
