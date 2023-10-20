import React from "react";

export default function RegisterForm() {
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/sign-up`,
        },
      });

      if (error) {
        setError(true);
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };
  return <div>RegisterForm</div>;
}
