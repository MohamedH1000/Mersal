// app/admin/listings/page.tsx

import { getAllChalets } from "@/lib/action/chalet.action";
import DataTable from "../DataTable";

export default async function ListingsPage() {
  const listings: any = await getAllChalets();
  //   console.log("listings", listings);

  return (
    <DataTable
      title="إدارة الشاليهات"
      columns={[
        { header: "العنوان", accessor: "title" },
        { header: "الوصف", accessor: "description" },
        {
          header: "السعر لكل ليلة",
          accessor: "price",
          render: (value) => `${value} ريال`,
        },
        { header: "عدد الغرف", accessor: "roomCount" },
        { header: "عدد الحمامات", accessor: "bathroomCount" },
        { header: "عدد الضيوف", accessor: "guestCount" },
        // { header: "الموقع", accessor: "locationValue" },
        // { header: "الحالة", accessor: "status" },
        { header: "الإجراءات", accessor: "actions" },
      ]}
      data={listings.map((listing) => ({
        ...listing,
        actions: (
          <div className="flex gap-2">
            <button className="text-[#bda069] hover:underline">تعديل</button>
            <button className="text-red-500 hover:underline">حذف</button>
          </div>
        ),
      }))}
    />
  );
}
