import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty, Col } from "antd";
import { removeCartItem, onSuccessBuy } from "../../../_actions/user_actions";
import Paypal from "./Sections/Paypal";
import Axios from "axios";
import {getCartItems} from "../../../_actions/user_actions"

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.userData.cart) {
      if (props.userData.cart.length > 0) {
        props.userData.cart.forEach((item) => {
          cartItems.push(item);
        });
        dispatch(getCartItems(cartItems));
      }
    }
  }, [props.user.userData]);

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      calculateTotal(props.user.cartDetail);
    }
  }, [props.user.cartDetail]);

  const calculateTotal = (cartDetails) => {
    let total = 0;
    cartDetails.map((item) => {
      total += parseInt(item.price);
    });
    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then(() => {
      if (props.user.cartDetail == null || props.user.cartDetail.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(props.user.cartDetail);
      }
    });
  };

  const transactionSuccess = (data) => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data,
    };

    Axios.post("/api/user/successBuy", variables).then((response) => {
      if (response.data.success) {
        if (response.data.success) {
          setShowSuccess(true);
          setShowTotal(false);

          dispatch(
            onSuccessBuy({
              cart: response.data.cart,
              cartDetail: response.data.cartDetail,
            })
          );
        }
      }
    });
  };

  const transactionError = (error) => {};

  const transactionCancel = (data) => {};

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>


      <div>
        <UserCardBlock product={props.user.cartDetail} removeItem={removeFromCart} />

        {ShowTotal ? (
          <div style={{ marginTop: "3 rem" }}>
            <h2>Total amount: $ {Total}</h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Suscessfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In Cart</p>
          </div>
        )}
      </div>

      {/* Payment */}
      {ShowTotal && (
        <Paypal total={Total} onSuccess onCancel onError />
      )}
    </div>
  );
}

export default CartPage;
