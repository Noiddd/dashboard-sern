"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabaseClient = createClientComponentClient();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(email);
      console.log(password);
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/signup`,
        },
      });

      if (error) {
        setError(true);
        console.log("ERROR");
        console.log(error);
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };
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
