import Cart from "./component/Cart/Cart";
import DisplayCart from "./component/DisplayCart/DisplayCart";
import Navbar from "./component/Navbar/Navbar";
import ProductDetails from "./component/Product/ProductDetails";
import Search from "./component/Search/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPic from "./component/Upload/UploadPic";
import Edit from "./component/Edit/Edit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Search />
        <Routes>
          <Route path="/" element={<DisplayCart />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/upload" element={<UploadPic />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
