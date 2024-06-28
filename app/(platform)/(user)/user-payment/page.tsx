"use client";

import React, { useState } from "react";
import Image from "next/image";

const PaymentPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [voucher, setVoucher] = useState<string>("");
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    phoneNumber: "",
    country: "",
    areaCode: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");

  const products = [
    { name: "Dielac Mama Gold", price: 75.0 },
    { name: "Optimum Mama Gold", price: 98.86 },
    { name: "Imperial XO Mom", price: 267.5 },
    { name: "Meiji Mama Milk", price: 291.07 },
    { name: "Enfamama A+", price: 226.2 },
  ];

  const totalQuantity = products.length;
  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);
  const shippingFee = 2.5;
  const VAT = totalPrice * 0.1;
  const orderTotal = totalPrice + shippingFee + VAT;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucher(e.target.value);
  };

  const handleUseNewAddress = () => {
    // Logic to use new address
  };

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Check if value has '/'
    if (!value.includes("/")) {
      // Automatically insert '/' after 2 characters
      if (value.length === 2) {
        value += "/";
      }
    }
    // Limit input to 5 characters (MM/YY format)
    if (value.length <= 5) {
      setExpireDate(value);
    }
  };

  return (
    <div className="mx-auto p-4 flex">
      <div className="w-4/5 pr-8 ml-20 mr-10">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <div className="mb-4 p-4 border rounded">
          <input
            type="radio"
            value="Lê Phú 2"
            checked={selectedAddress === "Lê Phú 2"}
            onChange={handleAddressChange}
            className="mr-2"
          />
          <label>
            Lê Phú - 123 Nam Kỳ Khởi Nghĩa, Quận 1, Việt Nam, (+84)123456789
          </label>
          <div className="mt-2 flex items-center">
            <button className="text-blue-500 ml-2">Edit</button>
            <span className="mx-1">|</span>
            <button className="text-blue-500 ml-2">Add Instructions</button>
          </div>
        </div>
        <div className="mb-4 p-4 border rounded">
          <input
            type="radio"
            value="Lê Phú"
            checked={selectedAddress === "Lê Phú"}
            onChange={handleAddressChange}
            className="mr-2"
          />
          <label>
            Lê Phú - 123 Lê Đức Thọ, Gò Vấp, Việt Nam, (+84)03910JQKA
          </label>
          <div className="mt-2 flex items-center">
            <button className="text-blue-500 ml-2">Edit</button>
            <span className="mx-1">|</span>
            <button className="text-blue-500 ml-2">Add Instructions</button>
          </div>
        </div>
        <div className="mb-4 p-4 border rounded">
          <input
            type="radio"
            value="new"
            checked={selectedAddress === "new"}
            onChange={handleAddressChange}
            className="mr-2"
          />
          <label>Add New Address</label>
          {selectedAddress === "new" && (
            <div className="mt-2">
              <div className="mb-2 flex">
                <div className="w-1/2 mr-2">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Ex: Lê"
                    value={newAddress.firstName}
                    onChange={handleNewAddressChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Ex: Trung"
                    value={newAddress.lastName}
                    onChange={handleNewAddressChange}
                    className="border p-2 w-full"
                  />
                </div>
              </div>
              <label>Street Address</label>
              <input
                type="text"
                name="streetAddress"
                placeholder="Ex: 123 Lê Đức Thọ, Quận Gò Vấp"
                value={newAddress.streetAddress}
                onChange={handleNewAddressChange}
                className="border p-2 w-full mb-2"
              />
              <div className="mb-2 flex">
                <div className="w-1/3 mr-2">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Ex: 678910JQK"
                    value={newAddress.phoneNumber}
                    onChange={handleNewAddressChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="w-1/3 mx-2">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Ex: Việt Nam"
                    value={newAddress.country}
                    onChange={handleNewAddressChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="w-1/3 ml-2">
                  <label>Area Code</label>
                  <input
                    type="text"
                    name="areaCode"
                    placeholder="(+84)"
                    value={newAddress.areaCode}
                    onChange={handleNewAddressChange}
                    className="border p-2 w-full"
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleUseNewAddress}
                  className="bg-green-500 text-white p-2"
                >
                  Use This Address
                </button>
              </div>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="mb-4 p-4 border rounded">
          <input
            type="radio"
            name="paymentMethod"
            value="CreditCard"
            checked={selectedPaymentMethod === "CreditCard"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          <label>Credit or Debit Card</label>
          {selectedPaymentMethod === "CreditCard" && (
            <div>
              <label>Name on Card</label>
              <input
                type="text"
                placeholder="Ex: Lê Bá Trung"
                className="border p-2 w-full mb-2"
              />
              <label>Card Number</label>
              <input
                type="text"
                placeholder="6666 7777 8888 9999"
                className="border p-2 w-full mb-2"
              />
              <div className="flex">
                <div className="w-1/2 mr-2">
                  <label>Expire Date (MM/YY)</label>
                  <input
                    type="text"
                    placeholder="00/00"
                    value={expireDate}
                    onChange={handleExpireDateChange}
                    className="border p-2 w-full mb-2"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label>CVV/CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="border p-2 w-full mb-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mb-4 p-4 border rounded flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={selectedPaymentMethod === "COD"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label>Cash on Delivery (COD)</label>
          </div>
          <Image
            src="https://via.placeholder.com/30x25"
            alt="COD"
            width={30}
            height={25}
            className="ml-2"
          />
        </div>
        <div className="mb-4 p-4 border rounded flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="VNPay"
              checked={selectedPaymentMethod === "VNPay"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label>VN Pay</label>
          </div>
          <Image
            src="https://via.placeholder.com/30x25"
            alt="VNPay"
            width={30}
            height={25}
            className="ml-2"
          />
        </div>
        <div className="mb-4 p-4 border rounded flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="MoMo"
              checked={selectedPaymentMethod === "MoMo"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label>MoMo</label>
          </div>
          <Image
            src="https://via.placeholder.com/30x25"
            alt="MoMo"
            width={30}
            height={25}
            className="ml-2"
          />
        </div>
      </div>
      <div className="w-2/5 mr-20">
        <div className="mb-4 p-4 border rounded">
          <label className="block mb-2">
            *We will contact you to confirm the order
          </label>
          <input
            type="email"
            placeholder="enteryouremail@gmail.com"
            value={email}
            onChange={handleEmailChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 p-4 border rounded">
          <label className="block mb-2">Have a Voucher?</label>
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
            <button
              className="!absolute right-1 top-1 z-10 select-none rounded bg-green-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Apply
            </button>
            <input
              type="voucher"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
              placeholder="Add Voucher"
              required
              value={voucher}
              onChange={handleVoucherChange}
            />
          </div>
        </div>
        <div className="mb-4 p-4 border rounded">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          </div>
          <ul className="mb-4">
            <li className="flex justify-between mb-2">
              <Image
                src="https://via.placeholder.com/50"
                alt="MamaMilk"
                width={50}
                height={50}
                className="mr-2"
              />
              <span className="flex-grow">Dielac Mama Gold</span>
              <span>75,00 $</span>
            </li>
            <li className="flex justify-between mb-2">
              <Image
                src="https://via.placeholder.com/50"
                alt="MamaMilk"
                width={50}
                height={50}
                className="mr-2"
              />
              <span className="flex-grow">Optimum Mama Gold</span>
              <span>98,86 $</span>
            </li>
            <li className="flex justify-between mb-2">
              <Image
                src="https://via.placeholder.com/50"
                alt="MamaMilk"
                width={50}
                height={50}
                className="mr-2"
              />
              <span className="flex-grow">Imperial XO Mom</span>
              <span>267,50 $</span>
            </li>
            <li className="flex justify-between mb-2">
              <Image
                src="https://via.placeholder.com/50"
                alt="MamaMilk"
                width={50}
                height={50}
                className="mr-2"
              />
              <span className="flex-grow">Meiji Mama Milk</span>
              <span>291,07 $</span>
            </li>
            <li className="flex justify-between mb-2">
              <Image
                src="https://via.placeholder.com/50"
                alt="MamaMilk"
                width={50}
                height={50}
                className="mr-2"
              />
              <span className="flex-grow">Enfamama A+</span>
              <span>226,20 $</span>
            </li>
          </ul>
          <div className="flex flex-col border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Items ({totalQuantity}):</span>
              <span>{totalPrice.toFixed(2)} $</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee:</span>
              <span>{shippingFee.toFixed(2)} $</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>VAT (10%):</span>
              <span>{VAT.toFixed(2)} $</span>
            </div>
            <div className="flex flex-col border-t pt-4">
              <div className="flex justify-between mb-2">
                <strong>Order Total:</strong>
                <strong>{orderTotal.toFixed(2)} $</strong>
              </div>
              <div className="text-center">
                <button className="bg-green-500 text-white p-2">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
