import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layouts";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<p>Home</p>} />
            <Route path="/search" element={<p>Search</p>} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
