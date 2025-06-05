// app/admin/users/page.tsx
"use client";

import { useState, useEffect } from "react";

import DataTable from "../DataTable";
import { User } from "@prisma/client";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/lib/action/user.action";
import { useToast } from "@/components/ui/use-toast";
import DeleteConfirmation from "./components/DeleteConfirmation";
import UserForm from "./components/UserForm";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      if (data?.users) {
        setUsers(data.users);
      }
    } catch (error) {
      toast({ title: "فشل تحميل المستخدمين" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle create/update user
  const handleSubmit = async (formData: FormData) => {
    try {
      if (selectedUser) {
        // Update existing user
        const result = await updateUser(selectedUser.id, formData);
        if (result?.success) {
          toast({ title: "تم تحديث المستخدم بنجاح" });
          fetchUsers();
          return true;
        }
      } else {
        // Create new user
        const result = await createUser(formData);
        if (result?.success) {
          toast({ title: "تم إنشاء المستخدم بنجاح" });
          fetchUsers();
          return true;
        }
      }
    } catch (error) {
      toast({ title: "حدث خطأ اثناء حفظ البيانات" });
    }
    return false;
  };

  // Handle delete user
  const handleDelete = async () => {
    if (!deleteUserId) return;

    try {
      const result = await deleteUser(deleteUserId);
      if (result?.success) {
        toast({ title: "تم حذف المستخدم بنجاح" });
        setUsers(users.filter((user) => user.id !== deleteUserId));
        setDeleteUserId(null);
      }
    } catch (error) {
      toast({ title: "حدث خطأ أثناء حذف المستخدم" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        title="إدارة المستخدمين"
        columns={[
          { header: "الاسم", accessor: "name" },
          { header: "البريد الإلكتروني", accessor: "email" },
          {
            header: "الدور",
            accessor: "role",
            render: (value) => (value === "admin" ? "مدير" : "مستخدم"),
          },
          { header: "تاريخ التسجيل", accessor: "createdAt" },
          { header: "الإجراءات", accessor: "actions" },
        ]}
        data={users.map((user) => ({
          ...user,
          createdAt: user.createdAt.toLocaleDateString("ar-EG"),
          actions: (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setShowForm(true);
                }}
                className="text-[#bda069] hover:underline"
              >
                تعديل
              </button>
              <button
                onClick={() => setDeleteUserId(user.id)}
                className="text-red-500 hover:underline"
              >
                حذف
              </button>
            </div>
          ),
        }))}
        onAddClick={() => {
          setSelectedUser(null);
          setShowForm(true);
        }}
      />

      {/* User Form Modal */}
      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setDeleteUserId(null)}
          resourceName="المستخدم"
        />
      )}
    </div>
  );
}
