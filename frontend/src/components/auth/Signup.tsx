import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { signUpSchema, type TSignUpSchema } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpSchema) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Label className="mb-2.5">Full Name</Label>
        <Input
          {...register("fullname")}
          type="text"
          placeholder="Enter your full name"
        />
      </div>

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
          type="password"
          placeholder="Create a password"
        />
      </div>

      <div>
        <Label className="mb-2.5">Confirm Password</Label>
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm your password"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="disabled:bg-amber-400"
      >
        Create Account
      </Button>
    </form>
  );
};

export default Signup;
