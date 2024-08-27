import { useState, useContext, useEffect } from "react";
import "./UploadPic.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { counterContext } from "../../context/AuthContext";
import axios from "axios";

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
    if (
      uploadData.title !== "" &&
      uploadData.category !== "" &&
      uploadData.description !== "" &&
      uploadData.price !== "" &&
      uploadData.rating !== ""
    ) {
      setdisablebutton(false);
    }
  }, [uploadData]);

  const submitUploadData = async (e) => {
    e.preventDefault();
    try {
      if (
        uploadData.title !== "" &&
        uploadData.category !== "" &&
        uploadData.description !== "" &&
        uploadData.price !== "" &&
        uploadData.rating !== ""
      ) {
        let response = await axios.post(
          "https://fakestoreapi.com/products",
          uploadData
        );
        let result = response.data;
        setData((pre) => [...pre, result]);
        toast.success("Image upload Successfully", {
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
        toast.error("Please Fill this All Input fields", {
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
    } catch {
      toast.error("We are facing Networking Errors", {
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
          <input
            type="id"
            name="id"
            placeholder="id"
            className="input-field"
            value={uploadData.id}
            onChange={newUploadData}
          />
          <div className="show-error" style={{ marginBottom: "15px" }}>
            {id === true && uploadData.id == "" ? (
              <span style={{ color: "red" }}>You are ID must be unique</span>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input-field"
            value={uploadData.title}
            onChange={newUploadData}
          />

          <div className="show-error" style={{ marginBottom: "15px" }}>
            {title === true && uploadData.title == "" ? (
              <span style={{ color: "red" }}>
                Enter Title in this input field
              </span>
            ) : (
              ""
            )}
          </div>

          <input
            type="text"
            name="category"
            placeholder="category"
            className="input-field"
            value={uploadData.category}
            onChange={newUploadData}
          />
          <div className="show-error" style={{ marginBottom: "15px" }}>
            {category === true && uploadData.category == "" ? (
              <span style={{ color: "red" }}>
                Enter category in this input field
              </span>
            ) : (
              ""
            )}
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className="textarea-field"
            value={uploadData.description}
            onChange={newUploadData}
          ></textarea>
          <div className="show-error" style={{ marginBottom: "15px" }}>
            {description === true && uploadData.description == "" ? (
              <span style={{ color: "red" }}>
                Enter description in this input field
              </span>
            ) : (
              ""
            )}
          </div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input-field"
            value={uploadData.price}
            onChange={newUploadData}
          />
          <div className="show-error" style={{ marginBottom: "15px" }}>
            {price === true && uploadData.price == "" ? (
              <span style={{ color: "red" }}>
                Enter number in this input field
              </span>
            ) : (
              ""
            )}
          </div>
          <input
            type="number"
            name="rating"
            placeholder="rating"
            className="input-field"
            value={uploadData.rating}
            onChange={newUploadData}
          />
          <div className="show-error" style={{ marginBottom: "15px" }}>
            {rating === true && uploadData.rating == "" ? (
              <span style={{ color: "red" }}>
                Enter rating in this input field
              </span>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            style={
              disablebutton
                ? { background: "#95D2B3" }
                : { background: "green" }
            }
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
