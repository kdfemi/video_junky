'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, FC } from "react";
import { classes, debounce } from "src/common/helper";

 
const SearchInput: FC<ComponentProps<'input'>> = ({className, onChange, placeholder, ...props }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Change input handler with calls delayed by 500 milliseconds
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
        {...props}
        className={classes(
          "focus:border-junky-yellow block w-full rounded-md border bg-primary text-white",
          "border-gray-500 py-[9px] pl-10 text-sm outline-none placeholder:text-gray-500", 
          className
        )}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e);
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}

export default SearchInput;