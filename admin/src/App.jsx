import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import SideBar from "./components/sideBar/SideBar";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import List from "./pages/List/List";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
