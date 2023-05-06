import { Table, ModalService, AddButton } from "./components";

export const ServicesPage = () => {
  return (
    <div className="bg-dark min-h-screen p-8 md:p-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl text-white font-bold mb-2">
          Registros de servicios a clientes
        </h1>
        <Table />
        <ModalService />
        <AddButton />
      </div>
    </div>
  );
};
