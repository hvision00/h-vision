"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholder = "Seleziona una data...",
  minDate,
  maxDate,
  className = ""
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm bg-white font-sans text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        wrapperClassName="w-full"
        aria-label="Select date"
        autoComplete="off"
      />
      
      {/* Icona calendario */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
      
      {/* Stili CSS personalizzati per react-datepicker */}
      <style jsx global>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        
        .react-datepicker {
          font-family: var(--font-poppins), sans-serif;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .react-datepicker__header {
          background-color: #3672e0;
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
        }
        
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white;
          font-weight: 500;
        }
        
        .react-datepicker__day {
          color: #374151;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }
        
        .react-datepicker__day:hover {
          background-color: #3672e0;
          color: white;
        }
        
        .react-datepicker__day--selected {
          background-color: #3672e0 !important;
          color: white !important;
        }
        
        .react-datepicker__day--keyboard-selected {
          background-color: #e0bf36;
          color: white;
        }
        
        .react-datepicker__day--today {
          background-color: #f3f4f6;
          color: #3672e0;
          font-weight: 600;
        }
        
        .react-datepicker__day--outside-month {
          color: #9ca3af;
        }
        
        .react-datepicker__navigation {
          border: none;
        }
        
        .react-datepicker__navigation--previous {
          border-right-color: white;
        }
        
        .react-datepicker__navigation--next {
          border-left-color: white;
        }
        
        .react-datepicker__triangle {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomDatePicker;