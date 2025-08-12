import React from "react";

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
  className?: string;
}

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  className = ""
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-background">
        {/* Header */}
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-foreground uppercase tracking-wider font-sans"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Body */}
        <tbody className="bg-background divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-gray-50 hover:bg-gray-50 transition-colors duration-150"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 text-sm text-foreground font-sans whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;