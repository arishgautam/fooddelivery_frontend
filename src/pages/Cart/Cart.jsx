import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((items) => {
          if (cartItems[items._id] > 0) {
            return (
              <div key={items._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"images/"+items.image} alt="" />
                  <p>{items.name}</p>
                  <p> Rs {items.price}</p>
                  <p>{cartItems[items._id]}</p>
                  <p>Rs {items.price * cartItems[items._id]}</p>
                  <p onClick={() => removeFromCart(items._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : 200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
