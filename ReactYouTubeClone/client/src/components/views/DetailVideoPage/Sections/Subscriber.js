import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

function Subscriber(props) {
  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscriberArgs = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    Axios.post("/api/subscriber/subscriberNumber", subscriberArgs).then(
      (response) => {
        if (response.data.success) {
          setSubscriberNumber(response.data.subscriberNumber);
        } else {
          alert("An internal Error has Occur");
        }
      }
    );

    Axios.post("/api/subscriber/subscribed", subscriberArgs).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert("An internal Error has Occur");
      }
    });
  }, []);

  const onSubscribe = (event) => {
    const subscriberArgs = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (Subscribed) {
      Axios.post("/api/subscriber/unsubscribe", subscriberArgs).then((res) => {
        if (res.data.success) {
          setSubscriberNumber(SubscriberNumber - 1);
          setSubscribed(false);
        } else {
          alert("An internal Error has Occur");
        }
      });
    } else {
      Axios.post("/api/subscriber/subscribe", subscriberArgs).then(
        (response) => {
          if (response.data.success) {
            setSubscriberNumber(SubscriberNumber + 1);
            setSubscribed(true);
          } else {
            alert("An internal Error has Occur");
          }
        }
      );
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          color: "white",
          border: "1px"
        }}
      >
        {SubscriberNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscriber;
