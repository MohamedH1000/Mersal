"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { Outfit } from "next/font/google";
import { motion } from "framer-motion";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { signOut } from "next-auth/react";
import { useToast } from "../ui/use-toast";

const outfit = Outfit({
  subsets: ["latin"],
});

interface NavbarProps {
  currentUser?: User | null;
}
const NavBar = ({ currentUser }: NavbarProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`h-[130px] w-full flex justify-between 
      px-[150px] py-6 max-md:px-4 max-md:py-4 ${
        isScrolled ? "shadow-lg duration-300" : "duration-300"
      }
    fixed top-0 z-10 bg-[#FFFFFF] items-center ${outfit.className}`}
    >
      <nav
        className="flex justify-center items-center
      gap-10 max-lg:hidden text-[17px]"
      >
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/"}
            className={`${
              pathname === "/"
                ? "border-b-[2px] border-black"
                : "hover:border-b-[2px] border-black"
            }`}
          >
            الرئيسية
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/reservation"}
            className={`${
              pathname === "/reservation"
                ? "border-b-[2px] border-black"
                : "hover:border-b-[2px] border-black"
            }`}
          >
            الحجز
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/services"}
            className={`${
              pathname === "/services"
                ? "border-b-[2px] border-black"
                : "hover:border-b-[2px] border-black"
            }`}
          >
            الخدمات الاضافية
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/contact-us"}
            className={`${
              pathname === "/contact-us"
                ? "border-b-[2px] border-black"
                : "hover:border-b-[2px] border-black"
            }`}
          >
            اتصل بنا{" "}
          </Link>
        </motion.div>
        {currentUser ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Menubar className="border-none" dir="rtl">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer">
                    <Avatar>
                      <AvatarImage src={currentUser?.image} />
                      <AvatarFallback>
                        {currentUser?.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link href={`/my-profile/${currentUser?.id}`}>
                      <MenubarItem className="cursor-pointer">
                        حسابي
                      </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    {currentUser?.role === "admin" && (
                      <>
                        <Link href={`/addchalet`}>
                          <MenubarItem className="cursor-pointer">
                            قم باضافة شاليه
                          </MenubarItem>
                        </Link>
                        <MenubarSeparator />
                      </>
                    )}
                    {currentUser?.role === "admin" && (
                      <>
                        <Link href={`/reservation/all-reservations`}>
                          <MenubarItem className="cursor-pointer">
                            الحجوزات
                          </MenubarItem>
                        </Link>
                        <MenubarSeparator />
                      </>
                    )}
                    <Link href={`/trips`}>
                      <MenubarItem className="cursor-pointer">
                        رحلاتي
                      </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <Link href={`/favourites`}>
                      <MenubarItem className="cursor-pointer">
                        المفضلة
                      </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <MenubarItem
                      className="cursor-pointer"
                      onClick={() => {
                        signOut();
                        toast({
                          title: "تم تسجيل الخروج بنجاح",
                          className: "bg-[green] text-white",
                        });
                      }}
                    >
                      تسجيل الخروج
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={"/sign-in"}
              className={`text-white bg-[#bda069] text-[20px] px-10 rounded-3xl font-bold py-3`}
            >
              دخول{" "}
            </Link>
          </motion.div>
        )}
      </nav>
      <MobileNav open={open} setOpen={setOpen} currentUser={currentUser} />

      <Link href={"/"}>
        <Image src={"/assets/icon.png"} alt="Logo" width={100} height={50} />
      </Link>
    </header>
  );
};

export default NavBar;
