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
    <div className="lg:hidden">
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
        items-start gap-5 text-[20px]  bg-white py-10 
        border-[#bda069] border-[2px] px-10 absolute
        top-[120px] right-0 w-full z-10 max-sm:top-[106px]"
        >
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "border-b-[2px] border-black" : ""
            }hover:border-b-[2px] border-black x `}
            onClick={() => setOpen((prev: any) => !prev)}
          >
            الرئيسية
          </Link>
          {currentUser?.role === "admin" && (
            <Link
              href={"/addchalet"}
              className={`${
                pathname === "/addchalet" ? "border-b-[2px] border-black" : ""
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

          {currentUser ? (
            <>
              <Link
                href={`/my-profile/${currentUser.id}`}
                className={`${
                  pathname === "/my-profile"
                    ? "border-b-[2px] border-black"
                    : ""
                }hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                حسابي{" "}
              </Link>
              {currentUser.role === "admin" && (
                <Link
                  href={`/reservation/all-reservations`}
                  className={`${
                    pathname === "/reservation/all-reservations"
                      ? "border-b-[2px] border-black"
                      : ""
                  }hover:border-b-[2px] border-black`}
                  onClick={() => setOpen((prev: any) => !prev)}
                >
                  الحجوزات{" "}
                </Link>
              )}
              <Link
                href={`/trips`}
                className={`${
                  pathname === "/trips" ? "border-b-[2px] border-black" : ""
                }hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                رحلاتي{" "}
              </Link>
              <Link
                href={`/favourites`}
                className={`${
                  pathname === "/favourites"
                    ? "border-b-[2px] border-black"
                    : ""
                }hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                المفضلة{" "}
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
                href={"/inquiry"}
                className={`${
                  pathname === "/inquiry" ? "border-b-[2px] border-black" : ""
                } hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                للاستعلام عن الحجز{" "}
              </Link>
              <Link
                href={"/contact-us"}
                className={`${
                  pathname === "/contact-us"
                    ? "border-b-[2px] border-black"
                    : ""
                }hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                اتصل بنا{" "}
              </Link>
              <Button
                className={`text-white bg-[#bda069] text-[20px] px-10 rounded-md font-bold py-3 w-full`}
                onClick={() => {
                  signOut();
                  setOpen((prev: any) => !prev);
                }}
              >
                تسجيل الخروج{" "}
              </Button>
            </>
          ) : (
            <>
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
                href={"/inquiry"}
                className={`${
                  pathname === "/inquiry" ? "border-b-[2px] border-black" : ""
                } hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                للاستعلام عن الحجز{" "}
              </Link>
              <Link
                href={"/contact-us"}
                className={`${
                  pathname === "/contact-us"
                    ? "border-b-[2px] border-black"
                    : ""
                }hover:border-b-[2px] border-black`}
                onClick={() => setOpen((prev: any) => !prev)}
              >
                اتصل بنا{" "}
              </Link>
              <Link
                href={"/sign-in"}
                className={`text-white bg-[#bda069] text-[20px] px-10 rounded-md font-bold py-3 w-full`}
              >
                دخول{" "}
              </Link>
            </>
          )}
        </motion.nav>
      )}
    </div>
  );
};

export default MobileNav;
