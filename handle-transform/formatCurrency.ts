export const formatCurrency = (price: number) => {
  return price.toLocaleString("vi-VN", {
    currency: "VND",
    style: "currency",
  });
};
