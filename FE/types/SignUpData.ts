import { z } from "zod";
import { SignUpSchema } from "../schemas/SignUpSchema";

export type SignUpData = z.infer<typeof SignUpSchema>;