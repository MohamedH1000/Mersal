"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { createUser } from "@/lib/action/user.action";
import { useToast } from "../ui/use-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Prisma } from "@prisma/client";

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      await createUser(registerData);
      toast({
        title: "تم انشاء الحساب بنجاح",
        className: "bg-[green] text-white",
      });
      const loginData = {
        email: registerData.email,
        password: registerData.password,
      };
      signIn("credentials", {
        ...loginData,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          router.refresh();
        }
      });
    } catch (error: any) {
      setError(error);
      console.log(error);
      toast({
        title: "مشكلة في انشاء المستخدم",
        description: "برجاء التاكد من البيانات",
        className: "bg-[red] text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const signUpGoogle = () => {
    if (googleLoading) return;

    setGoogleLoading(true);
    try {
      signIn("google").finally(() => setGoogleLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="mt-[140px] mb-[20px]"
    >
      <h1 className="text-[36px] font-bold max-sm:text-[30px]">
        اهلا بك في مرسال
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-4 w-[700px] mt-10 max-md:w-[500px] max-sm:w-[250px]"
      >
        {/* {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}
        <label htmlFor="email">الايميل</label>
        <Input
          name="email"
          type="email"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />
        <label htmlFor="name">الاسم</label>
        <Input
          name="name"
          type="name"
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
        />

        <label htmlFor="password">الباسوورد</label>
        <Input
          name="password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          type="password"
        />
        <Button
          className={`${
            isLoading
              ? "flex justify-center items-center h-[50px]"
              : "text-[20px] text-white"
          } bg-[#bda069] px-10 rounded-3xl 
          font-bold py-3 mt-5 w-full`}
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "تسجيل حساب"}
        </Button>
        <Button
          className={`${
            googleLoading
              ? "flex justify-center items-center h-[50px]"
              : "text-[20px] text-[black] border-[black] border-[1px]"
          } bg-[white] px-10 rounded-3xl hover:text-white
          font-bold py-3 mt-5 w-full max-sm:text-[12px]`}
          disabled={googleLoading ? true : false}
          onClick={signUpGoogle}
        >
          {googleLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div className="flex justify-center items-center gap-3">
              <FcGoogle />
              قم بتسجيل الدخول باستخدام جوجل
            </div>
          )}
        </Button>
        <div className="mt-4 flex justify-center items-center gap-3">
          <p>لديك حساب ؟</p>
          <Link href={"/sign-in"}>
            <p className="font-bold">قم بتسجيل الدخول</p>
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
