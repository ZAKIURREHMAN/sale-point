import React, { Suspense } from "react";
import Cart from "./component/Cart/Cart";
import DisplayCart from "./component/DisplayCart/DisplayCart";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ProductDetails = React.lazy(() =>
  import("./component/Product/ProductDetails")
);
const Search = React.lazy(() => import("./component/Search/Search"));
const Edit = React.lazy(() => import("./component/Edit/Edit"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Search />
          <Routes>
            <Route path="/" element={<DisplayCart />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/details/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
