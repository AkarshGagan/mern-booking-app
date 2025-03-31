import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layouts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<p>Home</p>} />
            <Route path="/search" element={<p>Search</p>} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
            {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
