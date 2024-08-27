import "./Cart.css";
import { counterContext } from "../../context/AuthContext";
import { useContext } from "react";

function Cart() {
  const { cartItems } = useContext(counterContext);

  return (
    <div className="cart-container">
      <div className="cart-box">
        <table>
          <thead>
            <tr>
              <th>ID Number</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price in Dollar</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.image} alt={item.title} width="50" />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.quantityNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
