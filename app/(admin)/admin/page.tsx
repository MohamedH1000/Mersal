// app/admin/page.tsx
import { FaUsers, FaHome, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import { getReservations } from "@/lib/action/reservations.action";
import { getAllUsers } from "@/lib/action/user.action";
import { getAllChalets } from "@/lib/action/chalet.action";

export default async function DashboardPage() {
  const reservations = await getReservations({});
  const { numberOfUsers }: any = await getAllUsers();
  const listings: any = await getAllChalets();
  const totalRevenue = reservations.reduce((sum, reservation) => {
    return sum + reservation.totalPrice;
  }, 0); //   console.log("reservat    ions", reservations);
  // Mock data for demonstration
  const stats = {
    users: 128,
    listings: 42,
    reservations: 367,
    revenue: 184500,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">لوحة التحكم</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="المستخدمين"
          value={numberOfUsers}
          icon={<FaUsers className="text-2xl" />}
          color="bg-[#bda069]"
        />
        <DashboardCard
          title="الشاليهات"
          value={listings.length}
          icon={<FaHome className="text-2xl" />}
          color="bg-[#8a6d3b]"
        />
        <DashboardCard
          title="الحجوزات"
          value={reservations.length}
          icon={<FaCalendarAlt className="text-2xl" />}
          color="bg-[#a1885f]"
        />
        <DashboardCard
          title="الإيرادات"
          value={`${totalRevenue} ريال`}
          icon={<FaChartBar className="text-2xl" />}
          color="bg-[#8c6b3c]"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">آخر الحجوزات</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-right">المستخدم</th>
                <th className="py-3 px-4 text-right">الشاليه</th>
                <th className="py-3 px-4 text-right">التاريخ</th>
                <th className="py-3 px-4 text-right">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {reservations.slice(0, 5).map((res) => (
                <tr key={res.id} className="border-b">
                  <td className="py-3 px-4">{res?.user?.name}</td>
                  <td className="py-3 px-4">{res?.listing?.title}</td>
                  <td className="py-3 px-4">
                    {res.startDate.split("T")[0]} - {res.endDate.split("T")[0]}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        res.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : res.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {res.status === "confirmed"
                        ? "مؤكد"
                        : res.status === "pending"
                        ? "قيد الانتظار"
                        : "ملغي"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
