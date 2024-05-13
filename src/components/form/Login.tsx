//tsrsfc
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import Inputs from "../inputs/Inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";


const FormSchema = z
  .object({
    email: z.string().email("กรุณาป้อน email ให้ถูกต้อง"),
    password: z
      .string()
      .min(6, "ไม่น้อยกว่า 6 อักขระ")
      .max(32, "ไม่มากกว่า 32 อักขระ"),

  })

type FormSchemaType = z.infer<typeof FormSchema>;
interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
 const router = useRouter()
 const path = router.pathname;
    console.log(path)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });



  const onSubmit: SubmitHandler<FormSchemaType> = async(values) => {
    const res : any = await signIn("credentials",{
      redirect:false,
      email:values.email,
      password: values.password,
    })
    if(res.error){
      return toast.error(res.error)
    }else{
      return router.push('/')
    }

  }

  return (
    <>
      <h1>Login form</h1>

      <div className="w-full px-12 py-4">
        <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
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
          <p>
            You don't have an account ?{" "}
            <a
            className="cursor-pointer"
            onClick={()=>router.push({
                pathname:path,
                query:{
                    tab: "signup"
                }
            })}
            >
                Sign up
            </a>
          </p>
          <br/>
          <hr />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;

