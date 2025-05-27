import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Spinner from "./ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [openModel, setOpenModel] = useState(false);
  const { loadingProducts, error, allProducts } = useSelector(
    (state) => state.products
  );
  const [refreshUi, setRefreshUi] = useState(false);
  const navigate = useNavigate();

  // fetching products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, refreshUi]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/${id}`,
        {
          headers: {
            adminToken: JSON.parse(localStorage.getItem("adminToken")),
          },
        }
      );
      setRefreshUi((p) => !p);
      toast.success("Product deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product!");
    }
  };

  if (loadingProducts) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="max-w-[80%] mx-auto py-3">
      <div className="w-full flex justify-between">
        <button
          className="py-2 px-4 font-semibold bg-red-500 hover:bg-red-400 cursor-pointer text-white rounded-full"
          onClick={() => setOpenModel(true)}
        >
          Add Product +
        </button>
        <button
          className="py-2 px-4 font-semibold bg-red-500 hover:bg-red-400 cursor-pointer text-white rounded-full"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/admin", { replace: true });
            toast.success("Logout successful!");
          }}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
        {Array.isArray(allProducts) && allProducts.length > 0 ? (
          allProducts.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center gap-2 my-2 relative"
            >
              <div>
                <img
                  src={item?.image}
                  alt={item?.title || "Product"}
                  className="size-54 object-cover rounded"
                />
              </div>

              <div className="text-center font-semibold">{item.title}</div>

              <div>₹{item.price}</div>
              <button
                className="absolute top-3 right-8 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => deleteItem(item._id)}
              >
                <MdDelete className="size-6 text-red-600" />
              </button>
            </div>
          ))
        ) : (
          <div className="size-full flex justify-center items-center col-span-full">
            <h2>No Products Found.</h2>
          </div>
        )}
      </div>

      {openModel && (
        <AddProductForm
          setRefreshUi={setRefreshUi}
          setOpenModel={setOpenModel}
        />
      )}
    </div>
  );
};

export default AdminProducts;

const AddProductForm = ({ setOpenModel, setRefreshUi }) => {
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState("");
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const updateProdData = (e) => {
    setProductData((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      formData.append("image", image);

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/create`,
        formData,
        {
          headers: {
            adminToken: JSON.parse(localStorage.getItem("adminToken")),
          },
        }
      );

      if (result.status === 201) {
        toast.success("Product Added!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product!");
    } finally {
      setLoading(false);
      setProductData({ title: "", price: "", category: "" });
      setImage("");
      imageRef.current.value = "";
      setOpenModel(false);
      setRefreshUi((p) => !p);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center"
      onClick={() => {
        setOpenModel(false);
      }}
    >
      <div
        className="p-3 bg-white rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-2xl font-semibold">Add Product</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex gap-1 items-center">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              value={productData.title}
              onChange={(e) => updateProdData(e)}
              className="border border-gray-500 rounded p-1 outline-none w-full"
            />
          </div>

          <div className="flex gap-1 items-center">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter Price"
              value={productData.price}
              onChange={(e) => updateProdData(e)}
              className="border border-gray-500 rounded p-1 outline-none w-full"
            />
          </div>

          <div className="space-x-3">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              className="outline-none border border-gray-500 rounded p-1"
              value={productData.category}
              onChange={(e) => updateProdData(e)}
            >
              <option value="">-- Select a Category --</option>
              <option value="men's wear">Men</option>
              <option value="women's wear">Women</option>
              <option value="kid's wear">Kids</option>
            </select>
          </div>

          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              ref={imageRef}
              onChange={(e) => updateImage(e)}
            />
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-fit bg-green-500 hover:bg-green-400 cursor-pointer py-1 px-10 rounded  text-white "
              disabled={loading}
            >
              {loading ? <Spinner /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
