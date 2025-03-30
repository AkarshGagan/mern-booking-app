import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../api-client";
const Appcontext = createContext();

export const AppContextProvier = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  //!useQuery behaves similarly to useEffect, but with built-in features for data fetching, caching, and automatic re-fetching. Here’s how they compare:
  const { isError, isLoading } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
    staleTime: 0, // Forces refetch every time
    cacheTime: 0, //
  });

  function showToast(toastMessage) {
    setToast(toastMessage);
  }

  console.log(isError);
  return (
    <Appcontext.Provider
      value={{
        showToast,
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Appcontext);
  return context;
};
