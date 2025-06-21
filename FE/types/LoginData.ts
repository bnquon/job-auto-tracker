import { z } from "zod";
import { LoginSchema } from "../schemas/LoginSchema";

export type LoginData = z.infer<typeof LoginSchema>;