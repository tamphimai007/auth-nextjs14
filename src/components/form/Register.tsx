//tsrsfc
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import Inputs from "../inputs/Inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";

const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be more than 2 character")
      .max(32, " ชื่อต้องน้อยกว่า 32 อักขระ")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character"),
    last_name: z
      .string()
      .min(2, "Last name must be more than 2 character")
      .max(32, "Last name must be less than 32 character")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character"),
    email: z.string().email("กรุณาป้อน email ให้ถูกต้อง"),
    password: z
      .string()
      .min(6, "ไม่น้อยกว่า 6 อักขระ")
      .max(32, "ไม่มากกว่า 32 อักขระ"),
    ConPassword: z.string(),
  })
  .refine((data) => data.password === data.ConPassword, {
    message: "Password doesn't match",
    path: ["ConPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;
interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);
  //   console.log(passwordScore)

  const onSubmit: SubmitHandler<FormSchemaType> = async(values) => {
    try{
      const { data } = await axios.post('/api/auth/signup',{
        ...values
      })
      reset();
      toast.success(data.message)
    }catch(error:any){
      console.log(error)
      toast.error(error.response.data.message)
    }

  }

  return (
    <>
      <h1>Register form</h1>

      <div className="w-full px-12 py-4">
        <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            name="first_name"
            label="First Name"
            type="text"
            placeholder="First Name"
            register={register}
            error={errors?.first_name?.message}
            disable={isSubmitting}
          />
          <Inputs
            name="last_name"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            register={register}
            error={errors?.last_name?.message}
            disable={isSubmitting}
          />
          <Inputs
            name="email"
            label="Email"
            type="text"
            placeholder="Email"
            register={register}
            error={errors?.email?.message}
            disable={isSubmitting}
          />
          <Inputs
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
            disable={isSubmitting}
          />
          {watch().password?.length > 0 && (
            <div className="flex mt-2">
              {Array.from(Array(5).keys()).map((span, i) => (
                <span className="w-1/5 px-1" key={i}>
                  <div
                    className={`h-2
                                    ${
                                      passwordScore <= 2
                                        ? "bg-red-500"
                                        : passwordScore < 4
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }
                                    `}
                  ></div>
                </span>
              ))}
            </div>
          )}

          <Inputs
            name="ConPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            register={register}
            error={errors?.ConPassword?.message}
            disable={isSubmitting}
          />

          <p>
            You already have an account?<Link href={"/auth"}>Sign In</Link>
          </p>

          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
