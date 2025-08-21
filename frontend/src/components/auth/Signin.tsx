import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signInSchema, type TSignInSchema } from "@/schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link } from "react-router";

const Signin = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: TSignInSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Label className="mb-2.5">Email</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Label className="mb-2.5">Password</Label>
        <Input
          {...register("password")}
          type="email"
          placeholder="Enter your password"
        />
      </div>
      <Link
        to="/"
        className="hover:underline text-blue-500 font-semibold text-sm"
      >
        Forgot Password?
      </Link>
      <Button>Sign In</Button>
    </form>
  );
};

export default Signin;
