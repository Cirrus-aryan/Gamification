import { createContext, useEffect, useState, type ReactNode } from "react";

interface SavedData {
  userEmail: string;
  userName: string;
  userProfilePicture: string;
  userId: string;
  userRole: string;
}

interface finalContextType {
  data: SavedData | null;
  setData: (val: SavedData | null) => void;
}

const DataContext = createContext<finalContextType>({
  data: null,
  setData: () => {},
});

function GlobaldataContext({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SavedData | null>(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userProfilePicture = localStorage.getItem("userProfilePicture");
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    if (userEmail && userName && userProfilePicture && userId && userRole) {
      setData({
        userEmail,
        userName,
        userProfilePicture,
        userId,
        userRole,
      });
    }
  }, []);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}

export { GlobaldataContext, DataContext };
