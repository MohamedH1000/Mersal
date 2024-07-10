import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <div className="min-h-screen mt-[130px]">{params.id}</div>;
};

export default page;
