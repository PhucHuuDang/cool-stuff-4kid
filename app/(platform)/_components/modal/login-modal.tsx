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
import { toast } from "sonner";
import { loginAccount } from "@/actions/login";
import { createCookie } from "@/store/actions";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useDrawerCart } from "@/hooks/use-drawer-cart";
import { useRouter } from "next/navigation";

export const LoginModal = () => {
  const { pending } = useFormStatus();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const drawerCart = useDrawerCart();
  const router = useRouter();

  const formInputRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    if (loginModal.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loginModal.isOpen]);

  const { execute, fieldErrors } = useAction(loginAccount, {
    onSuccess: async (data) => {
      toast.success("Login successfully");
      await createCookie(data);
      loginModal.onClose();
      router.push("/dash-board")
      if (drawerCart.isOpen) {
        drawerCart.onClose();
        router.push("/checkout");
      }
    },
    onError: (error) => {
      toast.error("Login failed");
    },
  });

  const onSubmit = (formData: FormData) => {
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    execute({ userName, password });
  };

  const toggle = () => {
    loginModal.onClose();
    registerModal.onOpen();
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
        Login
      </FormSubmit>
    </form>
  );
  // the footer body of form register
  const footerContent = (
    <div className="mt-1 flex flex-col gap-4">
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
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Are you have account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
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
