// app/admin/reservations/page.tsx

import DataTable from "../DataTable";

export default function ReservationsPage() {
  const reservations = [
    {
      id: "1",
      userName: "عمر أحمد",
      listingTitle: "شاليه جبل علي",
      startDate: "2023-12-15",
      endDate: "2023-12-18",
      totalPrice: 3600,
      status: "مؤكد",
    },
    {
      id: "2",
      userName: "سارة محمد",
      listingTitle: "فيلا الريف",
      startDate: "2023-12-20",
      endDate: "2023-12-25",
      totalPrice: 12500,
      status: "مؤكد",
    },
    {
      id: "3",
      userName: "خالد حسن",
      listingTitle: "شاليه الكورنيش",
      startDate: "2024-01-05",
      endDate: "2024-01-07",
      totalPrice: 3600,
      status: "قيد الانتظار",
    },
    {
      id: "4",
      userName: "نورا عبدالله",
      listingTitle: "شاليه الغروب",
      startDate: "2023-12-22",
      endDate: "2023-12-24",
      totalPrice: 3000,
      status: "ملغي",
    },
  ];

  return (
    <DataTable
      title="إدارة الحجوزات"
      columns={[
        { header: "المستخدم", accessor: "userName" },
        { header: "العقار", accessor: "listingTitle" },
        { header: "من", accessor: "startDate" },
        { header: "إلى", accessor: "endDate" },
        {
          header: "السعر الإجمالي",
          accessor: "totalPrice",
          render: (value) => `${value} درهم`,
        },
        { header: "الحالة", accessor: "status" },
        { header: "الإجراءات", accessor: "actions" },
      ]}
      data={reservations.map((res) => ({
        ...res,
        actions: (
          <div className="flex gap-2">
            <button className="text-[#bda069] hover:underline">تعديل</button>
          </div>
        ),
      }))}
    />
  );
}
