import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layouts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<p>Home</p>} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
            {isLoggedIn && <Route path="/add-hotel" element={<AddHotel />} />}
            {isLoggedIn && <Route path="/my-hotels" element={<MyHotels />} />}
            {isLoggedIn && (
              <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
            )}
            <Route path="/detail/:hotelId" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
