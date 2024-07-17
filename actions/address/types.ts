import { z } from "zod";
import { AddressSafeTypes } from "./schema";
import { ActionState } from "@/lib/create-safe-actions";
import { AddressCreateProps, AddressCreatedResponse } from "@/types/create";

export type InputType = z.infer<typeof AddressSafeTypes>;

export type ReturnType = ActionState<InputType, AddressCreatedResponse>;
