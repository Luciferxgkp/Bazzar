import { Card, Form, Image } from "antd";
import React from "react";
const Body = ({ _this }) => {
  return (
    <div className="flex min-h-screen justify-center p-0 lg:p-4">
      <div className="h-max flex w-full md:w-[60%] lg:w-[70%]">
        <Card
          className="h-max w-full"
          title={
            <div className="text-center text-[24px] font-extrabold">
              About Us
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[20px] font-extrabold">Gourav Kumar</div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="text-[14px] font-extrabold">GSTIN:</div>
              <div>08EVPPS5907C1Z5</div> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Body;
