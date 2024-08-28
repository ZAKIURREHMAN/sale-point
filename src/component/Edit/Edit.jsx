import "./Edit.css";
import { useParams } from "react-router-dom";
import { counterContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateData } from "../Services/ApiServices";
import InputFieldWithError from "../Common/InputFieldWithError";

function Edit() {
  const [img, setImg] = useState("");
  const { data, setData } = useContext(counterContext);
  const [disablebutton, setdisablebutton] = useState(true);
  const { id } = useParams();
  const productItem = data.find((i) => i.id == id);
  const [formData, setFormData] = useState(productItem);
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [price, setPrice] = useState(false);
  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    switch (name) {
      case "title":
        setTitle(true);
        break;
      case "description":
        setDescription(true);
        break;
      case "price":
        setPrice(true);
        break;
      default:
        break;
    }
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
      const { title, description, price } = formData;
      if (title === "" || description === "" || price === "") {
        toast.error("Please fill all required fields", toastConfig);
      } else {
        const response = await updateData(id, formData);
        toast.success("Data Updated Successfully", toastConfig);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === parseInt(id) ? response.data : item
          )
        );
      }
    } catch {
      toast.error("We are facing some errors", toastConfig);
    }
  };
  useEffect(() => {
    const { title, description, price } = formData;
    if (title === "" || description === "" || price === "") {
      setdisablebutton(true);
    } else {
      setdisablebutton(false);
    }
  }, [formData]);

  return (
    <div className="edit-container">
      <div className="edit-box">
        <div className="form-container">
          <form className="product-form" onSubmit={submitData}>
            <div
              className="edit-data-heading"
              style={{ textAlign: "center", marginTop: "-65px" }}
            >
              <h2>Edit</h2>
            </div>
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
            <InputFieldWithError
              type="text"
              name="title"
              placeholder="Enter title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
              displayError={title}
              errorMessage="Enter title in this input field"
            />

            <InputFieldWithError
              type="text"
              name="description"
              placeholder="Enter description"
              className="input-field"
              value={formData.description}
              onChange={handleChange}
              displayError={description}
              errorMessage="Enter description in this input field"
            />

            <InputFieldWithError
              type="number"
              name="price"
              placeholder="Enter price"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
              displayError={price}
              errorMessage="Enter price in this input field"
            />

            <button
              type="submit"
              className="submit-button"
              style={{ background: disablebutton ? "#95D2B3" : "green" }}
              disabled={disablebutton}
            >
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
