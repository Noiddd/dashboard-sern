"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cn } from "@/lib/utils";
import { AiOutlineGoogle } from "react-icons/ai";

export default function UserLoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabaseClient = createClientComponentClient();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(true);
        console.log("ERROR");
        return;
      }

      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event == "SIGNED_IN") {
          console.log("WE ARE IN");
          console.log(data);
        }
      });
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  //const { data:userData, error:sessionError } = await supabase.auth.getSession()

  // Check if there is a user
  // useEffect(() => {
  //   if (user) {
  //     router.push("/chat");
  //   }
  // }, [user]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Label htmlFor="email">Email address</Label>
        <Input type="email" id="email" placeholder="Email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
