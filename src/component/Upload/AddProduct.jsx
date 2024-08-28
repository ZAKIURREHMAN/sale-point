import { useState, useContext, useEffect } from "react";
import "./UploadPic.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { counterContext } from "../../context/AuthContext";
import { addProduct } from "../Services/ApiServices";
import InputFieldWithError from "../Common/InputFieldWithError";

function AddProduct() {
  const { setData } = useContext(counterContext);
  const [disablebutton, setdisablebutton] = useState(true);
  const [newImg, setNewImg] = useState();
  const [uploadData, setUploadData] = useState({
    id: "",
    category: "",
    description: "",
    image: "",
    price: "",
    rating: "",
    title: "",
  });
  const [id, setId] = useState(false);
  const [category, setCategory] = useState(false);
  const [description, setDescription] = useState(false);
  const [price, setPrice] = useState(false);
  const [rating, setRating] = useState(false);
  const [title, setTitle] = useState(false);
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

  const handelNewUploadImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };
      reader.onloadend = () => {
        if (img.height <= 200 && img.width <= 200) {
          setNewImg(img.src);
          setUploadData((pre) => ({
            ...pre,
            image: img.src,
          }));
        } else {
          toast.error("Image size only 200*200", {
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
      reader.readAsDataURL(file);
    }
  };

  const newUploadData = (e) => {
    const { name, value } = e.target;
    setUploadData({
      ...uploadData,
      [name]: value,
    });
    switch (name) {
      case "id":
        setId(true);
        break;
      case "category":
        setCategory(true);
        break;
      case "description":
        setDescription(true);
        break;
      case "price":
        setPrice(true);
        break;
      case "rating":
        setRating(true);
        break;
      case "title":
        setTitle(true);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const { title, category, description, price, rating } = uploadData;

    if (title && category && description && price && rating) {
      setdisablebutton(false);
    }
  }, [uploadData]);

  const submitUploadData = async (e) => {
    e.preventDefault();
    try {
      const { title, category, description, price, rating } = uploadData;

      if (title && category && description && price && rating) {
        let response = await addProduct(uploadData);
        let result = response.data;
        setData((pre) => [...pre, result]);
        toast.success("Image upload Successfully", toastConfig);
      } else {
        toast.error("Please Fill this All Input fields", toastConfig);
      }
    } catch {
      toast.error("We are facing Networking Errors", toastConfig);
    }
  };
  return (
    <div className="upload-images">
      <div className="form-container">
        <form className="product-form" onSubmit={submitUploadData}>
          <div
            className="edit-data-heading"
            style={{ textAlign: "center", marginTop: "-65px" }}
          >
            <h2>Upload Image</h2>
          </div>
          <div className="edit-product-images">
            <label htmlFor="upload-file">
              <img
                src={!newImg ? "./NavbarImages/upload-img.jpg" : newImg}
                alt="Upload new Images"
              />
            </label>
            <input
              type="file"
              name="Image"
              id="upload-file"
              onChange={handelNewUploadImg}
            />
          </div>

          <InputFieldWithError
            type="id"
            name="id"
            placeholder="Enter id"
            className="input-field"
            value={uploadData.id}
            onChange={newUploadData}
            displayError={id}
            errorMessage="Enter id in this input field"
          />
          <InputFieldWithError
            type="text"
            name="title"
            placeholder="Enter title"
            className="input-field"
            value={uploadData.title}
            onChange={newUploadData}
            displayError={title}
            errorMessage="Enter Title in this input field"
          />

          <InputFieldWithError
            type="text"
            name="category"
            placeholder="Enter category"
            className="input-field"
            value={uploadData.category}
            onChange={newUploadData}
            displayError={category}
            errorMessage="Enter category in this input field"
          />

          <InputFieldWithError
            type="text"
            name="description"
            placeholder="Enter description"
            className="input-field"
            value={uploadData.description}
            onChange={newUploadData}
            displayError={description}
            errorMessage="Enter description in this input field"
          />

          <InputFieldWithError
            type="number"
            name="price"
            placeholder="Enter price"
            className="input-field"
            value={uploadData.price}
            onChange={newUploadData}
            displayError={price}
            errorMessage="Enter price in this input field"
          />

          <InputFieldWithError
            type="number"
            name="rating"
            placeholder="Enter rating"
            className="input-field"
            value={uploadData.rating}
            onChange={newUploadData}
            displayError={rating}
            errorMessage="Enter rating in this input field"
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
  );
}

export default AddProduct;
