"use client";

import { ElementRef, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { useEventListener } from "usehooks-ts";

import { useLoginModal } from "@/hooks/use-login-modal";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import Heading from "./heading";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const LoginModal = () => {
  const { pending } = useFormStatus();
  const loginModal = useLoginModal();

  const formInputRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (loginModal.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loginModal.isOpen]);

  const onSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log({ email, password });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      formInputRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const bodyContent = (
    <form ref={formInputRef} action={onSubmit} className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" center />

      <FormInput
        id="email"
        label="Email"
        disabled={pending}
        ref={inputRef}
        placeholder="Email address"
        className="h-12"
        labelClassName="text-neutral-700"
        // register={register}
        // errors={errors}
        required
      />

      <FormInput
        id="password"
        label="Password"
        className="h-12"
        labelClassName="text-neutral-700"
        placeholder="Password"
        type="password"
        disabled={pending}
        required
      />

      <FormSubmit variant="book" className="h-12 " disabled={pending}>
        Login
      </FormSubmit>
    </form>
  );
  // the footer body of form register
  const footerContent = (
    <div className="flex flex-col gap-4 mt-1">
      <hr />
      <Button
        // onClick={() => signIn("google")}
        className="flex items-center gap-1"
      >
        <FcGoogle size={22} /> Continue with Google
      </Button>
      <Button
        // onClick={() => signIn("github")}
        className="flex items-center gap-1"
      >
        <AiFillGithub size={22} /> Continue with GitHub
      </Button>
      <div
        className="
            text-neutral-500
            text-center
            mt-4
            font-light
          "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Are you have account?</div>
          <div
            //?  onClick={toggle} toggle for register form
            className="text-neutral-500 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={pending}
      isOpen={loginModal.isOpen}
      title="Login"
      body={bodyContent}
      footer={footerContent}
      onClose={loginModal.onClose}
      onSubmit={() => onSubmit}
    />
  );
};
