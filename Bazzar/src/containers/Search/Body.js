import { Card, Empty, Input, List, Space } from "antd";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ProductCard from "../../components/ProductCard";

const Body = ({ _this }) => {
  return (
    <div className="flex flex-col mt-10 lg:mt-20 p-2 lg:p-4">
      <div className="flex md:hidden m-2">
        <Input
          prefix={
            <AiOutlineSearch size={20} className="text-gray-600 opacity-75" />
          }
          className="flex rounded-full w-full px-4 py-2 outline-none focus:shadow-outline"
          type="text"
          value={_this.searchValue}
          placeholder="Search for products, categories and brands"
          // onClick={navigator("/search")}
          onChange={(e) => {
            _this.handleSearch(e.target.value);
          }}
          onBlur={(e) => {
            _this.handleSearch(e.target.value);
          }}
          onPressEnter={(e) => {
            _this.handleSearch(e.target.value);
          }}
        />
      </div>
      {_this.data.length > 0 ? (
        <div className="flex min-h-screen justify-center">
          <div className="flex h-max w-auto md:w-[60%] lg:w-[70%] items-center">
            <Card
              // title={_this.searchValue.toUpperCase()}
              className={"w-full"}
              // title={
              //   <div className="flex md:hidden bg-black w-[15rem]">
              //     <Input
              //       prefix={
              //         <AiOutlineSearch
              //           size={20}
              //           className="text-gray-600 opacity-75"
              //         />
              //       }
              //       className="md:flex hidden rounded-full w-full px-4 py-2 outline-none focus:shadow-outline"
              //       type="text"
              //       value={_this.searchValue}
              //       placeholder="Search"
              //       // onClick={navigator("/search")}
              //       // onChange={(e) => {
              //       //   handleSearch(e.target.value);
              //       // }}
              //       onBlur={(e) => {
              //         _this.handleSearch(e.target.value);
              //       }}
              //       onPressEnter={(e) => {
              //         _this.handleSearch(e.target.value);
              //       }}
              //     />
              //   </div>
              // }
            >
              <div className="flex items-center ">
                <Space size={[8, 16]} wrap align="center">
                  {_this.data.map((item, index) => (
                    <ProductCard
                      onClick={() => _this.navigator(`/product/${item.id}`)}
                      key={index}
                      imgUrl={item.image}
                      id={item.id}
                      desc={item.desc}
                      name={item.name}
                      price={item.price}
                    />
                  ))}
                </Space>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen justify-center">
          <div className="flex h-max w-auto items-center">
            <Empty
              description={
                <span className="text-gray-600 opacity-75">
                  No results found
                </span>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
