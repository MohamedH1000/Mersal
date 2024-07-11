"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const page = () => {
  const products = [
    {
      id: 1,
      image: "/assets/restaurantable.avif",
      name: "سفرة طعام",
      price: "100",
      stock: 0,
      description:
        "نحن نقدم خدمة تجهيز سفرة الطعام بأفضل جودة وأسعار مناسبة. نحن نهتم بكل تفاصيل السفرة لضمان رضا العملاء. سواء كنت ترغب في تنظيم وجبة عائلية صغيرة أو حفلة كبيرة، فإننا نقدم مجموعة متنوعة من الخيارات لتناسب احتياجاتك. اتصل بنا اليوم للحصول على خدمة تجهيز السفرة التي لا تُنسى!",
    },
    {
      id: 2,
      image: "/assets/halatable.webp",
      name: "ضيافة حلى",
      price: "150",
      stock: 0,
      description:
        "نحن نقدم خدمة ضيافة الحلوى الراقية لجميع المناسبات. سواء كنت تخطط لحفل زفاف أو حفلة أو حتى اجتماع عمل، فإننا نضمن لك تجربة لا تُنسى مع مجموعة متنوعة من الحلويات الطازجة والمذاق الرائع. نحرص على تقديم أجود أنواع الحلويات المحلية والعالمية بأسعار تنافسية ونحرص على تقديم خدمة عملاء ممتازة. سواء كنت تبحث عن تشكيلة واسعة من الكب كيك والكعك أو حلوى مخصصة وفقا لذوقك الخاص، فإننا هنا لنلبي جميع احتياجاتك. اتصل بنا اليوم للحصول على اقتباس مجاني ودعنا نحول مناسبتك إلى حدث لا مثيل له.",
    },
    {
      id: 3,
      image: "/assets/kahwa.avif",
      name: "ضيافة قهوة",
      price: "250",
      stock: 0,
      description:
        "نحن نقدم خدمة تجهيز سفرة الطعام بأفضل جودة وأسعار مناسبة. نحن نهتم بكل تفاصيل السفرة لضمان رضا العملاء. سواء كنت ترغب في تنظيم وجبة عائلية صغيرة أو حفلة كبيرة، فإننا نقدم مجموعة متنوعة من الخيارات لتناسب احتياجاتك. اتصل بنا اليوم للحصول على خدمة تجهيز السفرة التي لا تُنسى!",
    },
    {
      id: 4,
      image: "/assets/partychairs.avif",
      name: "كراسي حفلات",
      price: "200",
      stock: 5,
      description:
        ":كراسي حفلات هي الخيار المثالي لإضفاء لمسة من الأناقة والراحة على أي مناسبة خاصة. تتميز بتصميمات متنوعة ومريحة، وتتوفر بألوان وأشكال مختلفة لتناسب جميع أنواع الحفلات والأحداث. سواء كنت تنظم حفل زفاف، حفلة تخرج، ستجد في كراسي الحفلات الخيار المثالي لتلبية احتياجاتك. بالإضافة إلى ذلك، فإنها سهلة الحمل والتركيب، مما يجعلها مثالية للاستخدام في الأماكن المغلقة والمفتوحة. بفضل كراسي الحفلات، ستتمكن من توفير جو مناسبتك بأناقة وراحة دون عناء.",
    },
  ];

  return (
    <div className="min-h-screen mt-[170px] ">
      <div
        dir="ltr"
        className="flex justify-between items-start px-[150px] max-md:px-5 max-md:flex-col max-md:gap-4"
      >
        <div>
          <p>{products.length} products</p>
        </div>
        <div className="flex justify-center items-center">
          <p>Sort by:</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Price (low to high)">
                Price (low to high)
              </SelectItem>
              <SelectItem value="Price (high to low)">
                Price (high to low)
              </SelectItem>
              <SelectItem value="recent">Most recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <motion.div
        className="grid grid-cols-4 justify-items-center
          gap-2 mt-10 w-full mb-10 px-[150px]
          max-md:px-5 max-lg:grid-cols-2 max-sm:grid-cols-1"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {products.map((product, i) => (
          <div key={i}>
            <Link href={`/services/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={288}
                height={288}
                className="h-[288px] rounded-2xl cursor-pointer"
              />
            </Link>
            <p className="font-bold text-[20px] mt-5">{product.name}</p>
            {product.stock === 0 ? (
              <p className="opacity-70">Sold Out</p>
            ) : (
              <p>SR{product.price}</p>
            )}
          </div>
        ))}
      </motion.div>
      <div className="h-[460px] bg-[url('/assets/chairs.jpg')] bg-fixed bg-cover bg-center" />
    </div>
  );
};

export default page;
