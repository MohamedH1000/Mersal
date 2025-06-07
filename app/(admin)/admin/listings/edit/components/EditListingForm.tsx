"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { useToast } from "@/components/ui/use-toast";

export default function EditListingForm({ initialData }: { initialData: any }) {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState(initialData.imageSrc || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (result: any) => {
    setImages((prev: string[]) => [...prev, result.info.secure_url]);
  };

  const removeImage = (index: number) => {
    setImages((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/listings/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imageSrc: images,
          price: Number(formData.price),
        }),
      });
      // console.log("response", response);
      if (response.ok) {
        router.push("/admin/listings");
        toast({ title: "تم تعديل الشاليه بنجاح" });
        router.refresh();
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">العنوان</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">السعر (ريال)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">عدد الغرف</label>
          <input
            type="number"
            name="roomCount"
            value={formData.roomCount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">عدد الحمامات</label>
          <input
            type="number"
            name="bathroomCount"
            value={formData.bathroomCount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">عدد الضيوف</label>
          <input
            type="number"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">الموقع</label>
          <input
            type="text"
            name="locationValue"
            value={formData.locationValue || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">الوصف</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block mb-2">الصور</label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((img: string, index: number) => (
            <div key={index} className="relative">
              <CldImage
                width="200"
                height="150"
                src={img}
                alt={`Listing image ${index + 1}`}
                className="rounded object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <CldUploadButton
          uploadPreset="mersal"
          onUpload={handleImageUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          إضافة صورة
        </CldUploadButton>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#bda069] text-white py-2 px-6 rounded hover:bg-[#a58c5a] disabled:opacity-50"
      >
        {isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
      </button>
    </form>
  );
}
