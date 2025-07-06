"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Download,
  Share2,
  Home,
} from "lucide-react";

const ReservationSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationData, setReservationData] = useState(null);

  // Simulate loading reservation data
  useEffect(() => {
    const timer = setTimeout(() => {
      setReservationData({
        id: "RES_1719072123456",
        chargeId: "chg_TS123456789",
        customerName: "احمد محمد",
        email: "ahmed@example.com",
        phone: "+966501234567",
        checkIn: "2025-07-15",
        checkOut: "2025-07-18",
        nights: 3,
        amount: 1500,
        currency: "SAR",
        propertyName: "شاليه الورود",
        propertyLocation: "الرياض، المملكة العربية السعودية",
        bookingDate: new Date().toLocaleDateString("ar-SA"),
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    console.log("Downloading receipt...");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "تأكيد الحجز",
        text: `تم تأكيد حجزك بنجاح! رقم الحجز: ${reservationData?.id}`,
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#bda069] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري تأكيد الحجز...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Success Animation */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="animate-pulse absolute inset-0 bg-[#bda069] rounded-full opacity-25 scale-110"></div>
              <div className="relative bg-[#bda069] rounded-full p-6 inline-block">
                <CheckCircle className="w-16 h-16 text-white animate-bounce" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-3">
              تم تأكيد الحجز بنجاح! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              شكراً لك، تم معالجة دفعتك وتأكيد حجزك
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#bda069] to-[#d4b87a] p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">تفاصيل الحجز</h2>
                  <p className="text-white/90">
                    رقم الحجز: {reservationData?.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/90 text-sm">تاريخ الحجز</p>
                  <p className="text-lg font-semibold">
                    {reservationData?.bookingDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    معلومات العميل
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-[#bda069] p-2 rounded-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الاسم</p>
                        <p className="font-semibold text-gray-800">
                          {reservationData?.customerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-[#bda069] p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          البريد الإلكتروني
                        </p>
                        <p className="font-semibold text-gray-800">
                          {reservationData?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-[#bda069] p-2 rounded-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">رقم الهاتف</p>
                        <p className="font-semibold text-gray-800">
                          {reservationData?.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    تفاصيل الإقامة
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-[#bda069] p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الشاليه</p>
                        <p className="font-semibold text-gray-800">
                          {reservationData?.propertyName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {reservationData?.propertyLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-[#bda069] p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">فترة الإقامة</p>
                        <p className="font-semibold text-gray-800">
                          {reservationData?.checkIn} إلى{" "}
                          {reservationData?.checkOut}
                        </p>
                        <p className="text-sm text-gray-600">
                          {reservationData?.nights} ليالي
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-[#bda069] p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          أوقات الوصول والمغادرة
                        </p>
                        <p className="font-semibold text-gray-800">
                          الوصول: 3:00 مساءً
                        </p>
                        <p className="text-sm text-gray-600">
                          المغادرة: 12:00 ظهراً
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  ملخص الدفع
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المبلغ المدفوع</span>
                  <span className="text-2xl font-bold text-green-600">
                    {reservationData?.amount} {reservationData?.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">معرف الدفع</span>
                  <span className="text-sm font-mono text-gray-700">
                    {reservationData?.chargeId}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex items-center gap-2 bg-[#bda069] hover:bg-[#a8956b] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  تحميل الإيصال
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                  مشاركة
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 transition-all duration-200 transform hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  العودة للرئيسية
                </button>
              </div>

              {/* Important Notes */}
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">
                  معلومات مهمة:
                </h4>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>
                    • سيتم إرسال تأكيد الحجز إلى بريدك الإلكتروني خلال دقائق
                  </li>
                  <li>
                    • يمكنك إلغاء الحجز مجاناً حتى 24 ساعة قبل موعد الوصول
                  </li>
                  <li>
                    • للاستفسارات أو التعديل على الحجز، تواصل معنا عبر الواتساب
                  </li>
                  <li>• يرجى إحضار هوية شخصية سارية المفعول عند الوصول</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;
