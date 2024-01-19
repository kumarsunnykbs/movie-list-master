"use client"
import React, { useState } from "react";
import { Card, CardFooter, Image, Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MoviesList = (props) => {
  const { moviesList } = props;
  const route = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalItems = moviesList.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderItemsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return moviesList.slice(startIndex, endIndex).map((item, index) => (
      <div
        key={index}
        onClick={() => route.push(`/edit-movie?id=${item._id}`)}
        className="col-span-12 sm:col-span-5 md:col-span-3 cursor-pointer h-[300px]"
      >
        <Card className="col-span-12 sm:col-span-5 md:col-span-3 cursor-pointer h-[300px]">
          <Image
            src={item?.image}
            alt="Card background"
            className="z-0 w-[100%] h-[100%] object-cover size-40"
          />
          <CardFooter className="absolute bg-current bottom-0 z-100 ">
            <div className="flex flex-grow gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">{item.title}</p>
                <p className="text-tiny text-white/60">{item.year}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    ));
  };

  const handleLogout = () => {
    route.push("/sign-in");
    localStorage.removeItem("session");
  }

  return (
    <>
      <div className="max-w-[900px] mx-auto flex items-center justify-between px-9 py-10 text-2xl font-semibold whitespace-nowrap dark:text-white">
        <div className="flex items-center">
          <span>My Movies</span>
        </div>
        <div>
          <p onClick={() => handleLogout()} className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</p>
        </div>
      </div>

      <div className="max-w-[900px] m-auto grid grid-cols-12 grid-rows-2 px-8 text-white gap-5">
        {renderItemsForPage()}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
          <Pagination
            total={Math.ceil(totalItems / itemsPerPage)}
            initialPage={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default MoviesList;
