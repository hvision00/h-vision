import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  className = ""
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className={className}>
      {/* Header - Tab list */}
      <div className="flex border-b border-gray-300 gap-2" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                px-4 py-2 rounded-t-md cursor-pointer font-sans transition-all duration-200 focus:outline-none
                ${isActive 
                  ? 'bg-background border-b-2 border-primary text-foreground font-bold' 
                  : 'text-gray-600 hover:text-primary'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Body - Tab content */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          className="p-4"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;