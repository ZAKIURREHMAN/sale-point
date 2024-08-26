import { useParams } from "react-router-dom";
import { counterContext } from "../../context/AuthContext";
import { useContext, useState, useCallback } from "react";
import "./ProductDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetails() {
  const { data, quantityNumber, setQuantityNumber, setCartItems } =
    useContext(counterContext);
  const { id } = useParams();
  const item = data.filter((i) => i.id == id);

  const getChangeData = (e) => {
    setQuantityNumber(e.target.value);
  };
  const sendItemCart = () => {
    if (quantityNumber < 1) {
      toast.error("Pleas Enter Quantity Number of Product", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setCartItems((pre) => [...pre, ...item, ...quantityNumber]);
      toast.success("Add to Cart Successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setQuantityNumber(0)
  };

  return (
    <div className="product-container">
      <div className="product-box">
        <div className="product-image">
          <img src={item[0].image} alt={item[0].title} />
        </div>
        <div className="product-text">
          <br />
          <br />
          <br />
          <div className="product-title">
            <p>{item[0].title}</p>
          </div>
          <br />
          <br /> <br />
          <div className="product-description">
            <p>{item[0].description}</p>
          </div>
          <br />
          <br /> <br />
          <div className="product-price">
            <p>$ {item[0].price}</p>
          </div>
          <br />
          <br />
          <div className="product-quantity">
            <span>Quantity</span>{" "}
            <span>
              <input type="number" max="9" min="0" onChange={getChangeData} />
            </span>
          </div>
          <div className="add-to-cart-button">
            <button onClick={sendItemCart}>Add to Cart</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductDetails;
