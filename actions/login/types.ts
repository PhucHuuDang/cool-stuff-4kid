import { z } from "zod";
import { LoginSafeTypes } from "./schema";
import { ActionState } from "@/lib/create-safe-actions";
import { LoginProps } from "../actions-types";

export type InputType = z.infer<typeof LoginSafeTypes>


export type ReturnType = ActionState<InputType, LoginProps>