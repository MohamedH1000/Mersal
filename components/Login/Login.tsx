"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      signIn("credentials", {
        ...loginData,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast({
            title: "تم تسجيل دخول بنجاح",
          });
          router.refresh();
        }

        if (callback?.error) {
          toast({
            title: "حدثت مشكلة اثناء عملية تسجيل الدخول",
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <h1 className="text-[36px] font-bold max-sm:text-[30px]">
        اهلا بك في مرسال
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-4 w-[700px] mt-10 max-md:w-[500px] max-sm:w-[250px]"
      >
        <label htmlFor="email">الايميل</label>
        <Input
          name="email"
          type="email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />

        <label htmlFor="password">الباسوورد</label>
        <Input
          name="password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          type="password"
        />
        <Button
          className={`text-white bg-[#bda069] text-[20px] 
          px-10 rounded-3xl font-bold py-3 mt-5 w-full`}
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? "جاري التسجيل" : "تسجيل الدخول"}
        </Button>
        <Button
          className={`${
            isLoading
              ? "flex justify-center items-center h-[50px]"
              : "text-[20px] text-[black] border-[black] border-[1px]"
          } bg-[white] px-10 rounded-3xl hover:text-white
          font-bold py-3 mt-5 w-full max-sm:text-[12px]`}
          disabled={isLoading ? true : false}
          onClick={() => signIn("google")}
        >
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div className="flex justify-center items-center gap-3">
              <FcGoogle />
              قم بتسجيل الدخول باستخدام جوجل
            </div>
          )}
        </Button>
        <div className="mt-4 flex justify-center items-center gap-3">
          <p>ليس لديك حساب ؟</p>
          <Link href={"/sign-up"}>
            <p className="font-bold">التسجيل</p>
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
