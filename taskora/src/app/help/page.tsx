import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <main className="min-h-screen bg-blue-100 ">
        <div className="p-15 w-full  ">
          <div className=" gird md:grid-cols-1 p-10 h-157 object-contain bg-white rounded-2xl shadow-2xl   ">
            <Image
              src="/help-center.avif"
              alt="help center pic"
              fill
              className=" "
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
