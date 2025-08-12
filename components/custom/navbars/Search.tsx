"use client";
import React, { useState } from "react";

const SearchInput = () => {
  const [inputText, setInputText] = useState("");
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  return (
    <input
      defaultValue={inputText}
      placeholder="Search.."
      onChange={handleSearchText}
      className=" w-full  h-full focus:bg-gray-800 focus:border-none border-none"
      name="search"
    ></input>
  );
};

export default SearchInput;
