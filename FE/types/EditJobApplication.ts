import { z } from "zod";
import { editJobApplicationSchema } from "../schemas/EditJobSchema";

export type EditJobApplication= z.infer<typeof editJobApplicationSchema>;
