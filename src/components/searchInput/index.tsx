'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { debounce } from "src/common/helper";

 
type SearchInputProps = {
  placeholder: string;
};

const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = debounce((searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="focus:border-junky-yellow block w-full rounded-md border bg-primary text-white border-gray-500 py-[9px] pl-10 text-sm outline-none placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}

export default SearchInput;