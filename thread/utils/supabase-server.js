import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () => {
  createServerComponentClient();
};
