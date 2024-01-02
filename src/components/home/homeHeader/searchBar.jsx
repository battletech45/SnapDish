import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex items-center bg-[#2D303E] border border-[#393C49] p-3 rounded-lg w-56">
      <div className="mr-2 text-gray-500">
        <Search color='white' size={15}/>
      </div>
      <input
        type="text"
        placeholder="Search for food, coffe, etc..."
        className="border-none bg-[#2D303E] outline-none w-full text-[#ABBBC2] font-barlow text-sm font-normal leading-5"
      />
    </div>
  );
};

export default SearchBar;
