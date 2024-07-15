"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
interface Params {
  params: { id: string };
}
const page = ({ params }: Params) => {
  const { id } = params;
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

  const product = products.find((prod) => prod.id.toString() === id);
  return (
    <motion.div
      className="min-h-screen mt-[170px] px-[145px] 
    max-md:px-5 grid grid-cols-2 items-start gap-5 max-md:grid-cols-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Image
        src={product?.image}
        alt={product?.name}
        width={288}
        height={288}
        className="rounded-2xl cursor-pointer w-full aspect-square "
        unoptimized
      />
      <div className="flex flex-col items-start justify-center gap-5 px-20 max-md:px-0 w-full">
        <h1 className="text-[40px] max-lg:text-[30px] font-medium">
          {product?.name}
        </h1>
        <p className="font-bold text-[20px]">{product?.price} SAR</p>
        <p className="mt-10 mb-10">{product?.description}</p>
      </div>
    </motion.div>
  );
};

export default page;
