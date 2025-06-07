import { getListingById } from "@/lib/action/chalet.action";
import EditListingForm from "../components/EditListingForm";
import console from "console";

const EditListingPage = async ({ params }: { params: { id: string } }) => {
  // console.log("params", params);
  const listing = await getListingById(params?.id);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">تعديل الشاليه</h1>
      <EditListingForm initialData={listing} />
    </div>
  );
};

export default EditListingPage;
