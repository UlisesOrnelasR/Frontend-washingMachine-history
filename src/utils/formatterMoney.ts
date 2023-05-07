export const formatterMoney = (value: number) => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format;

  return formatter(value);
};
