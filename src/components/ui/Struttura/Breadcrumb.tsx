import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = ""
}) => {
  if (items.length === 0) return null;

  return (
    <nav 
      role="navigation" 
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-gray-600 font-sans ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {/* Breadcrumb item */}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={isLast ? "text-gray-900 font-medium" : ""}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}

            {/* Separatore */}
            {!isLast && (
              <span className="text-gray-400" aria-hidden="true">
                /
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;