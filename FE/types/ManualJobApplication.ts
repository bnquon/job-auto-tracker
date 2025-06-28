import type { manualAddJobApplicationWithoutCycleSchema } from "schemas/ManualAddJobSchema";
import { z } from "zod";

export type ManualJobWithoutCycle = z.infer<typeof manualAddJobApplicationWithoutCycleSchema>;

export type ManualJobApplicationObject = ManualJobWithoutCycle & { cycle_id: number };