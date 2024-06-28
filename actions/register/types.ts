import { z } from "zod";

import { RegisterSafeTypes } from "./schema";
import { RegisterProps } from "../actions-types";
import { ActionState } from "@/lib/create-safe-actions";

export type InputType = z.infer<typeof RegisterSafeTypes>;

export type ReturnType = ActionState<InputType, RegisterProps>;
