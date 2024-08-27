import { useContext } from "react";
import "./display-cart.css";
import { counterContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function DisplayCart() {
  const { data, setData } = useContext(counterContext);
  const deleteItem = (id) => {
    const afterDeleteItem = data.filter((item) => item.id !== id);
    setData(afterDeleteItem);
  };

  return (
    <div className="display-main-container">
      <div className="display-container">
        {data.map((item) => (
          <div className="display-cart" key={item.id}>
            <span className="delete-item">
              <DeleteIcon
                sx={{ marginLeft: "270px" }}
                onClick={() => deleteItem(item.id)}
              />
            </span>
            <Link
              to={`/details/` + item.id}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="cart-img ">
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <h5>W8</h5>
                )}
              </div>
              <div className="cart-title">
                <p> {item.title} </p>
              </div>
              <Link to={`/edit/` + item.id} style={{ color: "black" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <EditIcon />
                </div>
              </Link>
              <div className="cart-price">
                <p>$ {item.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayCart;
