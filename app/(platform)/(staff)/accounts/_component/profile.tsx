import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import React from "react";

export const Profile = () => {
  return (
    <div>
      <header className="ml-3 mt-3 flex items-center border-b-2 border-gray-400">
        <img
          src="https://boroktimes.com/wp-content/uploads/2023/07/channels4_profile.jpeg"
          alt="avatar"
          className="mb-3 w-[100px] rounded-full"
        />
        <div className="ml-2">
          <p className="text-xl font-bold">Johnny Sins</p>
          <p>Staff</p>
        </div>
      </header>
      <div className="flex justify-center">
        <div className="mx-3 mt-4 flex h-[380px] w-3/4 justify-between rounded-2xl bg-white px-14 py-5 shadow-lg">
          <div className="">
            <div className="mb-4">
              <p className="font-semibold">First Name</p>
              <Card className="p-2">Johnny</Card>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Address</p>
              <Card className="p-2">Binh Chanh</Card>
            </div>
            <div className="flex">
              <div className="mr-2">
                <p className="font-semibold">Date of birth</p>
                <div className="flex">
                  <Card className="p-2">07</Card>
                  <Card className="p-2">10</Card>
                  <Card className="p-2">2002</Card>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Gender</p>
                <Card className="w-[170px] p-2">Male</Card>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Personal Social</p>
              <Card className="p-2">
                <a
                  href="https://joke-battles.fandom.com/wiki/Gigachad?file=Gigachad.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </Card>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p className="font-semibold">Last Name</p>
              <Card className="w-[300px] p-2">Sins</Card>
            </div>
            <div className="mb-4">
              <p className="font-semibold">City</p>
              <Card className="p-2">Ho Chi Minh</Card>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Contacts</p>
              <Card className="p-2">0123456789</Card>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Email</p>
              <Card className="p-2">Staff@gmail.com</Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
