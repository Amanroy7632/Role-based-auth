import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();
export const useSearch = () => {
  return useContext(SearchContext);
};
export const SearchContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // Cleanup on change
    };
  }, [searchQuery]);
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery,debouncedQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
