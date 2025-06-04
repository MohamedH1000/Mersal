// app/admin/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">الإعدادات</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">إعدادات الموقع</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                اسم الموقع
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue="شاليهات "
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                وصف الموقع
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                defaultValue="أفضل موقع لحجز الشاليهات في السعودية"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">إعدادات الحساب</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="********"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-[#bda069] text-white px-6 py-2 rounded-md hover:bg-[#a58c5e]">
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}
