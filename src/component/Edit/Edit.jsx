import "./Edit.css";
import { useParams } from "react-router-dom";
import { counterContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const { data, setData } = useContext(counterContext);
  const { id } = useParams();
  const productItem = data.find((i) => i.id == id);
  const [formData, setFormData] = useState(productItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.title == "" ||
        formData.description == "" ||
        formData.price == ""
      ) {
        toast.error("Please Fill this input Field", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const response = await axios.put(
          `https://fakestoreapi.com/products/${id}`,
          formData
        );
        toast.success("Data Updated Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setData((prevData) =>
          prevData.map((item) =>
            item.id === parseInt(id) ? response.data : item
          )
        );
      }
    } catch (err) {
      toast.error("We are facing some errors", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <div className="form-container">
          <form className="product-form" onSubmit={submitData}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="textarea-field"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
