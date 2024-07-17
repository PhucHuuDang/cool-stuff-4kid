import { PaymentResponseProps } from "./../../types/create/index";
import { z } from "zod";
import { PaymentSafeTypes } from "./schema";
import { ActionState } from "@/lib/create-safe-actions";

export type InputType = z.infer<typeof PaymentSafeTypes>;

export type ReturnType = ActionState<InputType, PaymentResponseProps>;
