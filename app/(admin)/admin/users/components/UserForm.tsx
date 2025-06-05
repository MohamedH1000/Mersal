// components/admin/UserForm.tsx
"use client";

import { useState } from "react";

interface UserFormProps {
  user?: any;
  onSubmit: (formData: FormData) => Promise<boolean>;
  onClose: () => void;
}

export default function UserForm({ user, onSubmit, onClose }: UserFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const success = await onSubmit(formData);

    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {user ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">الاسم الكامل</label>
            <input
              name="name"
              type="text"
              defaultValue={user?.name || ""}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user?.email || ""}
              className="w-full px-3 py-2 border rounded"
              required
              disabled={!!user}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">الدور</label>
            <select
              name="role"
              defaultValue={user?.role || "user"}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="admin">مدير</option>
              <option value="user">مستخدم</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {user ? "كلمة المرور الجديدة (اختياري)" : "كلمة المرور"}
            </label>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full px-3 py-2 border rounded pr-10"
                required={!user}
                minLength={6}
              />
              <button
                type="button"
                className="absolute left-3 top-3 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "إخفاء" : "إظهار"}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#bda069] text-white px-4 py-2 rounded hover:bg-[#a58c5e] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "جاري الحفظ..." : user ? "تحديث" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
