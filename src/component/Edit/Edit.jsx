import "./Edit.css";
import { useParams } from "react-router-dom";
import { counterContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const [img, setImg] = useState("");
  const { data, setData } = useContext(counterContext);
  const { id } = useParams();
  const productItem = data.find((i) => i.id == id);
  const [formData, setFormData] = useState(productItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImages = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };
      reader.onloadend = () => {
        if (img.width <= 200 && img.height <= 200) {
          setImg(img);
          setFormData({ ...formData, image: img.src });
        } else {
          toast.error("Image size only 200*200", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.title == "" ||
        formData.description == "" ||
        formData.price == ""
      ) {
        toast.error("Data is not Update", {
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
            <div className="edit-product-images">
              <label htmlFor="upload-file">
                <img src={img.src || formData.image} alt={formData.title} />
              </label>
              <input
                type="file"
                name="Image"
                id="upload-file"
                onChange={handleImages}
              />
            </div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
            />
            {formData.title == "" ? (
              <span style={{ color: "red" }}>
                Enter Title in this input field
              </span>
            ) : (
              ""
            )}
            <textarea
              name="description"
              placeholder="Description"
              className="textarea-field"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {formData.description == "" ? (
              <span style={{ color: "red" }}>
                Enter Description in this input field
              </span>
            ) : (
              ""
            )}
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
            />
            {formData.price == "" ? (
              <span style={{ color: "red" }}>
                Enter Price in this input field
              </span>
            ) : (
              ""
            )}

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
