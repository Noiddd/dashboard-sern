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
          router.push("/dashboard");
        }
      });
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  // if user comes into login with a session already running, will redirect to dashboard
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        router.push("/dashboard");
      }
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Label htmlFor="email">Email address</Label>
        <Input
          className="rounded"
          id="email"
          placeholder="Email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          className="rounded"
          id="password"
          placeholder="Password"
          type="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect="off"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
