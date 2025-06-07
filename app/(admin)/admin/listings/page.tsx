import { deleteListing, getAllChalets } from "@/lib/action/chalet.action";
import DataTable from "../DataTable";
import DeleteButton from "./components/DeleteButton";
import Link from "next/link";

export default async function ListingsPage() {
  const listings: any = await getAllChalets();

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
        {
          header: "الإجراءات",
          accessor: "id",
          render: (value: any) => {
            return (
              <div className="flex gap-2">
                <Link
                  href={`/admin/listings/edit/${value}`} // Use row?.id directly
                  className="text-[#bda069] hover:underline"
                >
                  تعديل
                </Link>
                <DeleteButton
                  id={value} // Use row?.id directly
                  action={deleteListing}
                  confirmMessage="هل أنت متأكد من حذف هذا الشاليه؟"
                />
              </div>
            );
          },
        },
      ]}
      data={listings}
    />
  );
}
