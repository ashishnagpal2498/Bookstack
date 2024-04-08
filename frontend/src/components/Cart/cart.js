import axios from "axios";
import { backend_url } from "../../util/config";
import { localStorageUtil } from "../../util";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CartComp() {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const payload = {
      email: localStorageUtil.getItem("user")?.email,
    };
    axios
      .post(`${backend_url}/cart/getallbookinfo`, payload)
      .then((response) => {
        //   console.log(response);
        setCartData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleRemove = async (bookId) => {
    // Remove the book from the cart in the backend
    const payload = {
      email: localStorageUtil.getItem("user")?.email,
      object_id: bookId,
    };
    await axios.post(`${backend_url}/cart/deletebook`, payload);

    // Remove the book from the state
    setCartData(cartData.filter((book) => book._id !== bookId));
  };

//   const handleReserve = async (bookId) => {
    
//   }

  return (
    <div className="cart bg-gray-100 p-4">
  <h2 className="text-4xl font-semibold mb-4 flex items-center justify-center">
    Your Cart
  </h2>
  {cartData.length === 0 ? (
    <p className="text-gray-600 text-center">Your cart is empty</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cartData.map((book) => (
        <div
          className="cart-item flex mb-4 border rounded-md p-4 hover:bg-gray-200"
          key={book._id}
        >
          <div className="image mr-4 flex-shrink-0">
            <img
              src={book.image_url}
              alt="Book"
              className="h-24 w-auto rounded-md shadow-md"
              onClick={() => handleBookClick(book._id)}
            />
          </div>
          <div className="details flex-grow">
            <h3 className="text-lg font-bold">{book.book_name}</h3>
            <p className="text-gray-600">{book.description}</p>
            <p className="text-green-600">Price: ${book.price}</p>
            <p className="text-blue-600">Genre: {book.book_classification}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600"
              onClick={() => handleRemove(book._id)}
            >
              Remove from Cart
            </button>
            {/* <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 ml-2"
              onClick={() => handleReserve(book._id)}
            >
              Reserve
            </button> */}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )
}

export default CartComp;
