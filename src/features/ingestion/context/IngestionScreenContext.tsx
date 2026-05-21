import React, { createContext, useContext } from "react";

type IngestionScreenContextType = {
  isTakingPhoto: boolean;
  setIsTakingPhoto: React.Dispatch<React.SetStateAction<boolean>>;
};

const IngestionScreenContext = createContext<IngestionScreenContextType>({
  isTakingPhoto: false,
  setIsTakingPhoto: () => {},
});

export const useIngestionScreenContext = () => {
  const context = useContext(IngestionScreenContext);
  if (context === undefined) {
    throw new Error(
      "useIngestionScreenContext must be used within a IngestionScreenContextProvider",
    );
  }
  return context;
};

export default function IngestionScreenContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTakingPhoto, setIsTakingPhoto] = React.useState(false);

  return (
    <IngestionScreenContext.Provider
      value={{ isTakingPhoto, setIsTakingPhoto }}
    >
      {children}
    </IngestionScreenContext.Provider>
  );
}
