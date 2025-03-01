import { useState, useEffect } from "react";

// Dummy charity data
const dummyCharities = [
  { id: 1, name: "Save the Children" },
  { id: 2, name: "World Wildlife Fund" },
  { id: 3, name: "Red Cross" },
  { id: 4, name: "Doctors Without Borders" },
  { id: 5, name: "Feeding America" },
  { id: 6, name: "Water.org" },
  { id: 7, name: "UNICEF" },
  { id: 8, name: "Habitat for Humanity" },
  { id: 9, name: "Charity: Water" },
];

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
    // useEffect(() => {
  //   const fetchData = () => {
  //     if (query.trim() === "") {
  //       setResults([]);
  //       return;
  //     }

  //     // Simulate fetching by filtering dummy data
  //     const filteredResults = dummyCharities.filter((charity) =>
  //       charity.name.toLowerCase().includes(query.toLowerCase())
  //     );

  //     setResults(filteredResults);
  //   };

  //   const timeoutId = setTimeout(fetchData, 300); // Debounce API calls
  //   return () => clearTimeout(timeoutId); // Cleanup
  // }, [query]);


  useEffect(() => {
    const fetchData = () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      // Simulate fetching by filtering dummy data
      const filteredResults = dummyCharities.filter((charity) =>
        charity.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
    };

    const timeoutId = setTimeout(fetchData, 300); // Debounce API calls
    return () => clearTimeout(timeoutId); // Cleanup
  }, [query]);

  return (
    <div className="relative w-full max-w-xl z-40 p-2">
      <label className="flex items-center gap-2 w-full rounded-full border-2 border-gray-200 px-4 py-3 shadow-lg shadow-blue-600/50">
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </svg>
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-black font-semibold text-lg placeholder-gray-400"
          placeholder="Search for charities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <ul className="absolute top-full left-0 -mt-3 w-[92%] ml-5  text-black bg-white border border-gray-200 rounded-b-lg shadow-lg -z-10">
          {results.map((charity) => (
            <li key={charity.id} className="p-3 hover:bg-gray-100 cursor-pointer">
              {charity.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
