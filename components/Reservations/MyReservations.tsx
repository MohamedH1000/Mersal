"use client";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Button } from "@mui/material";
import { Link } from "lucide-react";

const MyReservations = ({ currentUser }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const reservations = [];

  if (!currentUser) {
    router.replace("/sign-in");
    toast({
      title: "يجب تسجيل الدخول قبل الحجز",
    });
  }
  return (
    <>
      {reservations.length > 0 ? (
        <div>here is your reservations</div>
      ) : (
        <div
          className="flex flex-col justify-center 
        items-center gap-10 w-full max-md:pr-5 max-md:pl-5"
        >
          <h1 className="text-[50px] font-bold mt-20 max-md:text-[45px] max-md:text-center">
            ليس لديك اي حجوزات سابقا
          </h1>
          <Link href={"/"}>
            <Button
              className="bg-[black] text-white hover:bg-white 
          hover:text-[black] hover:border-[1px] w-[300px] font-bold
          hover:border-[black] transition duration-300 rounded-md max-md:w-[220px]"
            >
              العودة
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default MyReservations;
