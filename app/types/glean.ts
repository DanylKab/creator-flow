import { z } from "zod";

export const gleanSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().nonempty(),
  tags: z.string().array(),
  collections: z.string().array(),
});
export type GleanData = z.infer<typeof gleanSchema>;
