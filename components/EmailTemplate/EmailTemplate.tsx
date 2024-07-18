import { Html, Heading, Text } from "@react-email/components";
const EmailTemplate = ({
  nameOfReserver,
  email,
  message,
  startDate,
  endDate,
  phoneNumber,
}: {
  nameOfReserver: string;
  email: string;
  message: string;
  startDate: any;
  endDate: any;
  phoneNumber: string;
}) => {
  return (
    <Html lang="en">
      <Heading as="h1">بيانات حجزك الخاصة بمنتجع مرسال</Heading>
      <Text>تم تاكيد حجزك والبيانات كالاتي:</Text>
      <Text>الاسم: {nameOfReserver}</Text>
      <Text>الايميل: {email}</Text>
      <Text>تاريخ الوصول: {startDate}</Text>
      <Text>تاريخ المغادرة: {endDate}</Text>
      <Text>رقم الهاتف: {phoneNumber}</Text>
      <Text>{message}</Text>
    </Html>
  );
};
export default EmailTemplate;
