import React from "react";
interface Params {
  params: { id: string };
}
const page = ({ params }: Params) => {
  return <div className="min-h-screen mt-[170px]">{params.id}</div>;
};

export default page;
