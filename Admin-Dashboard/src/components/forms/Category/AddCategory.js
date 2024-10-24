import React, { useRef, useState } from "react";
import "../../../App.css";
import Navbar from "../../Navbar";
import axios from "axios";
import Switch from "../../Switch";
import Alert from "../../Alert";

export default function AddCategory() {
  const [alertval, setAlert] = useState(null);
  const [image, setImage] = useState(null);
  const [catobj, setCatobj] = useState({ category: "", color: "" });
  const [isToggled, setIsToggled] = useState(false);

  const fileInputRef = useRef(null); // Reference for file input

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]); // Only use onChange to manage the file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!catobj.category) {
      alert("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", catobj.category);
    formData.append("color", catobj.color || "#000000");
    formData.append("allowed", isToggled);

    axios
      .post("http://127.0.0.1:8000/api/category/", formData)
      .then((response) => {
        showAlert("Category Added Successfully", "success");
        setCatobj({ category: "", color: "" });
        setImage(null);
        fileInputRef.current.value = ""; // Reset file input
      })
      .catch((error) => console.error(error));
  };

  const onDiscard = (e) => {
    e.preventDefault();
    setCatobj({ category: "", color: "" });
    setImage(null);
    fileInputRef.current.value = ""; // Reset file input
  };

  const onChange = (e) => {
    setCatobj({ ...catobj, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="main m-0 p-0 bg-tailtertiary">
        <Navbar pagename="Add Category Page" pagenumber="101" />
        <Alert alert={alertval} />
        <div className="h-screen items-center flex pb-32">
          <div
            style={{ width: "800px" }}
            className="mt-4 bg-white border border-2 rounded-md resize-x mx-auto flex shadow-[0_20px_50px_rgba(8,_100,_150,_0.5)]"
          >
            <form className="w-full mx-auto p-4" onSubmit={handleSubmit}>
              <h2 className="text-center font-bold font-mono text-2xl">
                CATEGORY
              </h2>
              <hr className="w-48 mt-2 border-2 mx-auto" />

              <div className="flex flex-col justify-center">
                <label>Enter a Category:</label>
                <input
                  required
                  className="p-2 resize-x border mt-2 rounded-md"
                  type="text"
                  name="category"
                  value={catobj.category}
                  onChange={onChange}
                  placeholder="Enter Category"
                />
              </div>

              <div className="flex-col py-2 justify-center">
                <label>Select Header Color:</label>
                <input
                  value={catobj.color}
                  required
                  className="w-full h-8 p-2 mb-2 resize-x border mt-2 rounded-md"
                  type="color"
                  name="color"
                  onChange={onChange}
                />
              </div>

              <div className="flex-col py-2">
                <label className="mr-4">Subcategory Allowed:</label>
                <Switch
                  isToggled={isToggled}
                  onToggle={() => setIsToggled(!isToggled)}
                />
              </div>

              <div className="flex flex-col py-2">
                <label>Upload Category Image:</label>
                <input
                  ref={fileInputRef} // Reference for file input
                  className="mt-1 border p-2 rounded-md"
                  type="file"
                  name="image"
                  onChange={onImageChange}
                />
              </div>

              <div className="flex mx-auto">
                <button
                  type="submit"
                  className="m-2 font-poppins font-bold border w-full mt-2 mb-2 rounded-md py-2 bg-tailtertiary3 hover:bg-tailprimary text-black"
                >
                  SAVE
                </button>
                <button
                  type="reset"
                  className="m-2 font-poppins font-bold border w-full mt-2 mb-2 rounded-md py-2 bg-tailtertiary3 hover:bg-red-600 text-black"
                  onClick={onDiscard}
                >
                  DISCARD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
