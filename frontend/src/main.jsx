import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvier } from "./contexts/AppContext.jsx";
import { SearchContextProvider } from "./contexts/SearchContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvier>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AppContextProvier>
  </QueryClientProvider>
);
