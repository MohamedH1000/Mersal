import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen mt-[130px] px-[145px] max-md:px-5">
      {params.id}
    </div>
  );
};

export default page;
