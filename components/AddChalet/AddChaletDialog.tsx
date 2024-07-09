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

const AddChaletDialog = ({ currentUser }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chaletDetails, setChaletDetails] = useState({
    bathroomCount: null,
    guestCount: null,
    price: null,
    roomCount: null,
    imageSrc: "",
    description: "",
    title: "",
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
      <h1 className="text-[40px] font-medium">قم باضافة الشاليه الخاص بك</h1>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="mt-20 bg-[#bda069] text-white hover:text-[#bda069] 
          hover:bg-white border-[#bda069] hover:border-[1px] 
          rounded-full transition duration-300 p-4 text-[20px] font-medium"
          >
            ابدا الان
          </DialogTrigger>
          <DialogContent dir="ltr" className="h-[600px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center">
                قم باضافة شاليهك
              </DialogTitle>
              <Separator />
            </DialogHeader>
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
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddChaletDialog;
