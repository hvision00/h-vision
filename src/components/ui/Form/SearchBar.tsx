import React from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Cerca...",
  value,
  onChange,
  onSubmit,
  className = ""
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form 
      role="search"
      onSubmit={handleSubmit}
      className={`flex items-center rounded-full border border-gray-300 px-4 py-2 gap-2 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200 ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Search"
        className="flex-1 outline-none bg-transparent text-sm font-sans text-foreground placeholder:text-gray-400"
      />
      
      <button
        type="submit"
        onClick={handleButtonClick}
        className="bg-primary text-white p-2 rounded-full hover:brightness-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-center"
        aria-label="Cerca"
      >
        {/* Icona lente di ingrandimento */}
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;