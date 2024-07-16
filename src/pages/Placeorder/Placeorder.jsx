
import { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  // const placeOrder = async (event) => {
  //   event.preventDefault();
  //   let orderItems = [];
  //   food_list.map((item) => {
  //     if (cartItems[item._id] > 0) {
  //       let itemInfo = item;
  //       itemInfo["quantity"] = cartItems[item._id]
  //       orderItems.push(itemInfo)
  //     }
  //   })
  //   let orderData = {
  //     address: data,
  //     items: orderItems,
  //     amount: getTotalCartAmount() + 2,
  //   }
  //   let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
  //   if (response.data.success) {
  //     const { session_url } = response.data;
  //     window.location.replace(session_url);
  //   }
  //   else {
  //     alert("Error");
  //   }
  // }
  const [totalAmount, setTotalAmount] = useState();
  useEffect(() => {
    setTotalAmount(getTotalCartAmount() + 200)

  }, [])


  //! Esewa Khalti Integration
  const [orders, setOrders] = useState([]);

  const handlePayment = async (payment_method) => {
    const url = `${url}api/orders/create`;
    const data = {
      amount: totalAmount,
      products: [{ product: "test", totalAmount: totalAmount, quantity: 1 }],
      payment_method,
    };
    // const data = {
    //   amount: getTotalCartAmount() + 2,
    //   products: [{ product: "test", amount: 100, quantity: 1 }],
    //   payment_method,
    // };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(data),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        } else if (responseData.payment_method === "khalti") {
          khaltiCall(responseData.data);
        }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const khaltiCall = (data) => {
    window.location.href = data.payment_url;
  };

  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    const getOrders = async () => {
      const url = `${url}api/orders`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const responseData = await response.json();
          // console.log(responseData);
          setOrders(responseData);
        } else {
          console.error(
            "Failed to fetch:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    getOrders();
  }, []);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/cart')
  //   }
  //   else if (getTotalCartAmount() === 0) {
  //     navigate('/cart')
  //   }
  // }, [token])

  return (
    <>
      <form className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          {/* <h1>Esewa Test</h1>
        <button
          style={{ background: "#55aa33", margin: 10 }}
          onClick={() => handlePayment("esewa")}
        >
          Handle Esewa Payment
        </button>
        <button
          style={{ background: "#55aa33", margin: 10 }}
          onClick={() => handlePayment("khalti")}
        >
          Handle Khalti Payment
        </button> */}
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
          </div>

          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>

          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>

          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs. {getTotalCartAmount()}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>Rs. {getTotalCartAmount() === 0 ? 0 : 200}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <b>Total</b>
                <b>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b>
              </div>
            </div>
            <button
              style={{ background: "#55aa33", margin: 10 }}
              onClick={() => handlePayment("esewa")}
            >
              Handle Esewa Payment
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Placeorder