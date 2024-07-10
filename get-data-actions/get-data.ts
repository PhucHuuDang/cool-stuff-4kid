export const getData = async (url: string) => {
  // console.log(url);
  const response = await fetch(`${process.env.NEXT_PRIVATE_API_URL}${url}`, {
    cache: "no-store",
  });

  // console.log(`${process.env.NEXT_PRIVATE_API_URL}${url}`);

  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  const data = await response.json();
  return data;
};

export const infiniteData = async (url: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  const data = await response.json();
  return data;
};
