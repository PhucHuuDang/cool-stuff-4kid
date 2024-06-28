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
import { FormError } from "@/components/form/form-error";
import { useAction } from "@/hooks/use-action";
import { registerAccount } from "@/actions/register";
import { toast } from "sonner";
import { useRegisterModal } from "@/hooks/use-register-modal";

export const RegisterModal = () => {
  const { pending } = useFormStatus();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const formInputRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (loginModal.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loginModal.isOpen]);

  const { execute, fieldErrors } = useAction(registerAccount, {
    onSuccess: (data) => {
      toast.success("Register successfully");
      registerModal.onClose();
      loginModal.onOpen();
    },
    onError: (error) => {
      toast.error("Register failed, please try again!");
    },
  });

  const onSubmit = (formData: FormData) => {
    const userName = formData.get("userName") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    execute({ userName, fullName, email, password });
  };

  const toggle = () => {
    loginModal.onOpen();
    registerModal.onClose();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      formInputRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const bodyContent = (
    <form ref={formInputRef} action={onSubmit} className="flex flex-col gap-4">
      <Heading title="Welcome!" subtitle="Register your account!" center />

      <FormInput
        id="fullName"
        label="Full Name"
        disabled={pending}
        ref={inputRef}
        placeholder="Nguyen Van Loc"
        className="h-12"
        labelClassName="text-neutral-700"
        // register={register}
        // errors={errors}
        required
      />
      <FormError id="fullName" errors={fieldErrors} />

      <FormInput
        id="userName"
        label="User Name"
        disabled={pending}
        ref={inputRef}
        placeholder="nguyenvanloc"
        className="h-12"
        labelClassName="text-neutral-700"
        // register={register}
        // errors={errors}
        required
      />

      <FormError id="userName" errors={fieldErrors} />

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

      <FormError id="email" errors={fieldErrors} />

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

      <FormError id="password" errors={fieldErrors} />

      <FormSubmit variant="book" className="h-12" disabled={pending}>
        Register
      </FormSubmit>
    </form>
  );
  // the footer body of form register
  const footerContent = (
    <div className="mt-1 flex flex-col gap-4">
      {/* <Button
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
      </Button> */}
      <div className="text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Are you have account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
          >
            Already have an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={pending}
      isOpen={registerModal.isOpen}
      title="Register"
      body={bodyContent}
      footer={footerContent}
      onClose={registerModal.onClose}
      onSubmit={() => onSubmit}
    />
  );
};
