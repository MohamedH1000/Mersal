import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface NavbarProps {
  currentUser?: User | null;
  open: Boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const MobileNav = ({ open, setOpen, currentUser }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      {open ? (
        <Image
          src={"/assets/close.png"}
          alt="close"
          height={50}
          width={20}
          onClick={() => setOpen((prev: any) => !prev)}
        />
      ) : (
        <Image
          src={"/icons/hamburger.svg"}
          alt="menu"
          height={50}
          width={40}
          className="invert"
          onClick={() => setOpen((prev: any) => !prev)}
        />
      )}
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          exit={{ opacity: 0 }}
          className="flex flex-col justify-center 
        items-start gap-5 text-[20px]  bg-white  py-10 
        border-[gray] border-t-[2px] px-10 absolute 
        top-[130px] right-0 w-full -z-10"
        >
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "border-b-[2px] border-black" : ""
            }hover:border-b-[2px] border-black`}
            onClick={() => setOpen((prev: any) => !prev)}
          >
            الرئيسية
          </Link>
          {currentUser?.role === "admin" && (
            <Link
              href={"/addchalet"}
              className={`${
                pathname === "/reservation" ? "border-b-[2px] border-black" : ""
              }hover:border-b-[2px] border-black`}
              onClick={() => setOpen((prev: any) => !prev)}
            >
              قم بإضافة شاليه
            </Link>
          )}
          <Link
            href={"/reservation"}
            className={`${
              pathname === "/reservation" ? "border-b-[2px] border-black" : ""
            }hover:border-b-[2px] border-black`}
            onClick={() => setOpen((prev: any) => !prev)}
          >
            الحجز
          </Link>
          <Link
            href={"/services"}
            className={`${
              pathname === "/services" ? "border-b-[2px] border-black" : ""
            }hover:border-b-[2px] border-black`}
            onClick={() => setOpen((prev: any) => !prev)}
          >
            الخدمات الاضافية
          </Link>
          <Link
            href={"/contact-us"}
            className={`${
              pathname === "/contact-us" ? "border-b-[2px] border-black" : ""
            }hover:border-b-[2px] border-black`}
            onClick={() => setOpen((prev: any) => !prev)}
          >
            اتصل بنا{" "}
          </Link>
          {currentUser ? (
            <>
              <Link
                href={"/my-profile"}
                className={`${
                  pathname === "/my-profile"
                    ? "border-b-[2px] border-black"
                    : ""
                }hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                حسابي{" "}
              </Link>
              <Button
                className={`text-white bg-[#bda069] text-[20px] px-10 rounded-md font-bold py-3 w-full`}
                onClick={() => signOut()}
              >
                تسجيل الخروج{" "}
              </Button>
            </>
          ) : (
            <Link
              href={"/sign-in"}
              className={`text-white bg-[#bda069] text-[20px] px-10 rounded-md font-bold py-3 w-full`}
            >
              دخول{" "}
            </Link>
          )}
        </motion.nav>
      )}
    </div>
  );
};

export default MobileNav;
