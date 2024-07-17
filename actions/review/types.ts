import { z } from "zod";
import { ReviewSafeTypes } from "./schema";
import { ActionState } from "@/lib/create-safe-actions";
import { ReviewResponse } from "../actions-types";

export type InputType = z.infer<typeof ReviewSafeTypes>;

export type ReturnType = ActionState<InputType, ReviewResponse>;
