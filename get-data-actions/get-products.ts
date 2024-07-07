export const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PRIVATE_API_URL}/Product/GetAllProducts`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) throw new Error("Failed to fetch products");
  const data = await response.json();

  return data;
};
