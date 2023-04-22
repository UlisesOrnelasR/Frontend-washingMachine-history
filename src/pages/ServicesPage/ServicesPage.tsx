export const ServicesPage = () => {
  return (
    <div className="bg-dark min-h-screen p-8 md:p-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl text-white font-bold mb-2">
          Registros de servicios a clientes
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead className="text-left ">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  Date of Birth
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  Salary
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
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  $120,000
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  04/11/1980
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  Web Designer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  $100,000
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-bold text-text">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  Singer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  $20,000
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
