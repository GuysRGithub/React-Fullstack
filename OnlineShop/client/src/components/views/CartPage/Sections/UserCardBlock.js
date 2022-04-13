import React from "react";

function UserCardBlock(props) {

    const imageSrc = (images) => {
        if (images.length > 0) {
            return `http://localhost:5000/${images[0]}`
        }
        return `http://localhost:5000/${images}`
        
    }

    const removeFromCart = () => {

    }

  const renderItemsCart = () => {
    props.products &&
      props.products.map((product) => {
        return (
          <tr key={product._id}>
            <td>
              <img style={{ width: "70px" }} src={imageSrc(product.images)} alt="product" />
            </td>
            <td>{product.quantity} EA</td>
            <td>$ {product.price}</td>
            <td>
              <button onClick={() => props.removeItem(product._id)}>Remove</button>
            </td>
          </tr>
        );
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>
            {renderItemsCart()}
        </tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
