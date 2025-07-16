import type { TabItem } from "./type";
import TabCard from "./TabCard";

const TabList = ({
  tabs,
  setTabs,
}: {
  tabs: TabItem[];
  setTabs: (tabs: TabItem[]) => void;
}) => {
  const handleDelete = (id: number | undefined) => {
    // Filter out the tab based on its id or format.
    // Using `id || format` ensures that if id is undefined, format is used as a fallback key.
    setTabs(tabs.filter((_d,index) => index !== id ));
  };

  return (

    <div className="flex flex-row overflow-x-auto py-2 px-4 space-x-3 bg-gray-50 border-t border-b border-gray-200">
      {tabs.map((tab, index) => (
        <TabCard
          key={tab.id || `${tab.Formate}-${index}`}
          tab={tab}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
};

export default TabList;