import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadPic() {
  const [img, setImg] = useState([]);

  const getImages = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };
      reader.onloadend = () => {
        if (img.width <= 200 && img.height <= 200) {
          setImg((pre) => [...pre, reader.result]);
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

  return (
    <div className="container">
      <input type="file" name="" id="" onChange={getImages} />
      {img.map((item, index) => (
        <div className="main-container" key={index + 1}>
          <img src={item} alt={`Uploaded image ${index + 1}`} />
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default UploadPic;
