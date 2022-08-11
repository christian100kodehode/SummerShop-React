import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { render } from "react-dom";

// Set renderCart to get the contents of localStorage and parse it (as an array in rendCart here),
// if the localStorage is empty, set it to a empty array []
const CartPage = () => {
  const [renderCart, setRenderCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  // Everytime renderCart is changed, the localStorage will get updated and converted to a string (everytime setRenderCart
  //  is called upon)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(renderCart));
  }, [renderCart]);

  // Make a new function called handleRemove and make it recieve item from onclick event (item) name it removeitemz.
  // calling setRenderCart with a callback function, using it again to filter through the contents of renderCart
  // Remove items with filtering through prevRenderCart (the items in renderCart):
  //item.id !== removeItemz.id (the item recieved from the onclick below(item)) (example if selected item id is 205, then item with id 205
  //  will not get returned but everything else)
  const handleRemove = (removeItemz) => {
    setRenderCart((prevRenderCart) => prevRenderCart.filter((item) => item.id !== removeItemz.id));
  };

  return (
    <>
      <div className="backBtnContainer">
        <Link to="/">
          <p>⬅️ Back</p>
        </Link>
        <Link to="/">
          <button
            onClick={() => {
              localStorage.clear();
            }}
          >
            ⛔Empty Cart
          </button>
        </Link>
      </div>
      <div className="cartContainerCart">
        {renderCart.map((item) => (
          <div className="cardCart" key={item.id}>
            <div className="textContainerCart">
              <p className="cardTitlecart">{item.title} </p>
              <p className="itemDescriptionCart">{item.description.slice(0, 200)}...</p>
              <p> Price: ${item.price}</p>
            </div>
            <div className="imageContainerCart">
              <img className="cartImage" src={item.image} />
              <div className="removeButton">
                {/* Run the handleRemove function on button click - Remove item */}
                <button onClick={() => handleRemove(item)}>⛔</button>
              </div>
            </div>
          </div>
        ))}
        <div>
          {/* Use the array.reduce function to go through all objects in the cart and addition the price to show total
          This will get updated as soon as the array get  */}
          <h2>Total Price: $ {renderCart.reduce((total, obj) => obj.price + total, 0).toFixed(2)} </h2>
        </div>
      </div>
    </>
  );
};

export default CartPage;
