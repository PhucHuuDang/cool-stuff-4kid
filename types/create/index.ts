// {
//   "addressId": 0,
//   "phone": "005000",
//   "addressName": "vinhome",
//   "street": "123 nguyen van tang",
//   "city": "HCM",
//   "country": "Vietnam",
//   "id": "8db1864e-e3ad-49a3-bb22-3c065886b137"
// }

export type AddressCreateProps = {
  addressName: string;
  street: string;
  phone: string;
  city: string;
  country: string;
  id: string;
};

export type AddressCreatedResponse = {
  data: null;
  isSuccess: boolean;
  message: string;
};
