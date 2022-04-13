import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  render() {
    const onSuccess = (payment) => {
      console.log("Success");
    };

    const onCancel = (data) => {
      console.log("Cancel");
    };

    const onError = (err) => {
      console.log("Error");
    };

    let env = "sandbox";
    let currency = "USD";
    let total = 1;

    const client = {
      sandbox: "ID",
      production: "Product ID",
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onCancel={onCancel}
        onSuccess={onSuccess}
        style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
        }}
      />
    );
  }
}

export default Paypal;
