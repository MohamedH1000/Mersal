"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/AddChalet/ImageUpload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createChalet } from "@/lib/action/chalet.action";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const AddChaletDialog = ({ currentUser }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chaletDetails, setChaletDetails] = useState<any>({
    bathroomCount: null,
    guestCount: null,
    price: null,
    roomCount: null,
    imageSrc: "",
    description: "",
    title: "",
    pathname,
  });
  if (currentUser?.role !== "admin") router.push("/");
  const clear = () => {
    setChaletDetails({
      bathroomCount: null,
      guestCount: null,
      price: null,
      roomCount: null,
      imageSrc: "",
      description: "",
      title: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createChalet(chaletDetails);
      toast({
        title: "تم اضافه الشاليه للنظام بنجاح",
      });
      clear();
    } catch (error) {
      console.log(error);
      toast({
        title: "حدثت مشكله اثناء اضافة الشاليه",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <motion.h1
        className="text-[40px] font-medium"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
      >
        قم باضافة الشاليه الخاص بك
      </motion.h1>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 100, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="mt-20 bg-[#bda069] text-white hover:text-[#bda069]
            hover:bg-white border-[#bda069] hover:border-[1px]
            rounded-full transition duration-300 p-8 text-[20px] font-medium"
            onClick={() => setOpen((prev: any) => !prev)}
          >
            ابدا الان
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 100, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          dir="ltr"
          className={` ${
            open
              ? "absolute pointer-events-auto h-[500px] w-[500px] max-sm:w-[300px] mx-auto overflow-y-auto max-md:right-0 shadow-lg px-6  z-10"
              : "hidden pointer-events-none"
          } bg-white bottom-[50px] rounded-md py-5 border-[1px] border-[#bda069]`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-center">قم باضافة شاليهك</h1>
            <Image
              src={"/assets/close.png"}
              alt="close"
              width={10}
              height={10}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-5" dir="rtl">
            <h1>ما هي وسائل الراحة التي تمتلكها؟</h1>
            <div className="flex justify-between items-center">
              <p>عدد الضيوف</p>
              <Input
                type="number"
                placeholder="عدد الضيوف"
                className="w-[100px]"
                value={chaletDetails?.guestCount}
                onChange={(e) =>
                  setChaletDetails({
                    ...chaletDetails,
                    guestCount: e.target.value,
                  })
                }
                disabled={isLoading ? true : false}
              />
            </div>
            <div className="flex justify-between items-center">
              <p>عدد الغرف</p>
              <Input
                type="number"
                placeholder="عدد الغرف"
                className="w-[100px]"
                value={chaletDetails?.roomCount}
                onChange={(e) =>
                  setChaletDetails({
                    ...chaletDetails,
                    roomCount: e.target.value,
                  })
                }
                disabled={isLoading ? true : false}
              />
            </div>
            <div className="flex justify-between items-center">
              <p>عدد الحمامات</p>
              <Input
                type="number"
                placeholder="عدد الحمامات"
                className="w-[100px]"
                value={chaletDetails?.bathroomCount}
                onChange={(e) =>
                  setChaletDetails({
                    ...chaletDetails,
                    bathroomCount: e.target.value,
                  })
                }
                disabled={isLoading ? true : false}
              />
            </div>
            <h1 className="mt-10">قم باضافة صورة:</h1>
            <p className="opacity-60">أظهر لعملائك كيف يبدو المكان</p>
            <ImageUpload
              value={chaletDetails.imageSrc}
              onChange={(value) =>
                setChaletDetails({
                  ...chaletDetails,
                  imageSrc: value,
                })
              }
            />
            <h1 className="mt-5">كيف تحب ان تعبر عن المكان؟</h1>
            <Input
              type="text"
              placeholder="عنوان المكان"
              className="w-full"
              value={chaletDetails?.title}
              onChange={(e) =>
                setChaletDetails({
                  ...chaletDetails,
                  title: e.target.value,
                })
              }
              required
              disabled={isLoading ? true : false}
            />
            <Separator />
            <Input
              type="text"
              placeholder="قم بوصف المكان"
              className="w-full"
              value={chaletDetails?.description}
              onChange={(e) =>
                setChaletDetails({
                  ...chaletDetails,
                  description: e.target.value,
                })
              }
              required
              disabled={isLoading ? true : false}
            />
            <h1 className="font-bold mt-5">الان, قم بتسعير الشاليه</h1>
            <p className="opacity-85">كم سعر الشاليه بالليلة؟</p>
            <Input
              type="number"
              placeholder="السعر بالليلة الواحدة"
              className="w-full"
              value={chaletDetails?.price}
              onChange={(e) =>
                setChaletDetails({
                  ...chaletDetails,
                  price: e.target.value,
                })
              }
              required
              disabled={isLoading ? true : false}
            />
            <Button
              className="w-full rounded-md bg-[#bda069] text-white
                border-[#bda069] hover:border-[1px] hover:bg-white hover:text-[#bda069]
                transition duration-300 font-bold"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              {isLoading ? "برجاء الانتظار" : "قم باضافة الشاليه"}
            </Button>
            <Button onClick={clear} disabled={isLoading ? true : false}>
              اعد تعبئة الحقول
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AddChaletDialog;
