import React, { useEffect } from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StorePage() {
  // Set up all the states that will be used, cartContent will get localstorare with key "cart" or if not exist
  // set as empty array []
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [cartContent, setCartContent] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  // Get Data from Fakestore API, set it as data, catch Error and set it to true if error on loading of data
  const getData = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/`);
      setData(res.data);
    } catch {
      setError(true);
    }
  };

  // Use useEffect to see everytime cartContent is changed to put it (setItem) into localstorage as a string
  // (JSON.stringify)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartContent));
  }, [cartContent]);

  // run the getData (to fetch API) on every load of page (using: ,[])

  useEffect(() => {
    getData();
  }, []);

  // Adding new items to the cart, using the state cartContent,
  // changing id: Date.now() - to not have two products with same id.
  const handleAdd = (item) => {
    setCartContent((prevState) => [...prevState, { ...item, id: Date.now() }]);
  };

  if (data) {
    return (
      // Check if cartContent exist and length of array is not 0 OR check if localstorage is not Null to show
      //  buttons for cart and remove cart contents , if they exist these will be shown, if not welcome text is shown
      <>
        {cartContent && cartContent.length > 0 ? (
          <div className="CartBtn">
            <p className="totalPriceCart">Total Price: $ {cartContent.reduce((total, obj) => obj.price + total, 0).toFixed(2)} </p>
            <Link to="/cart-page">
              <button className="cartBtnStore">🛒Cart</button>
            </Link>

            <button
              className="emptyBtnStore"
              onClick={() => {
                setCartContent([]);
              }}
            >
              ⛔Empty Cart
            </button>
          </div>
        ) : (
          <p className="orderSomethingText">Welcome to our Store! Please Order Something..</p>
        )}
        {/* Map through the data and show what we want the customer to see + id */}
        <div className="Container">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <p className="cardTitle">{item.title}</p>
              <img src={item.image} />
              <p className="cardPrice">${item.price.toFixed(2)}</p>
              <button
                onClick={() => {
                  handleAdd(item);
                }}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </>
    );
  } else if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading..</p>
      </div>
    );
  }
}

export default StorePage;
