import { z } from "zod";
import { manualAddJobApplicationSchema } from "../schemas/ManualAddJobSchema";

export type ManualJobApplication = z.infer<typeof manualAddJobApplicationSchema>;