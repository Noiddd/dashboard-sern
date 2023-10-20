import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserLoginForm from "@/components/login/UserLoginForm";

const LoginForm = () => {
  return (
    <div>
      <UserLoginForm />
    </div>
  );
};

export default LoginForm;
