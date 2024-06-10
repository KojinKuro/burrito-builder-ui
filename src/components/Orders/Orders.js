import React from "react";
import { possibleIngredients } from "../../data/ingredients";
import { calculateTotalCost, findIngredients } from "../../utils/ingredients";
import "./Orders.css";

const Orders = (props) => {
  const orderEls = props.orders.map((order) => {
    const totalCost =
      order.totalCost !== undefined
        ? order.totalCost
        : calculateTotalCost(
            findIngredients(order.ingredients, possibleIngredients)
          );

    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        <button
          data-test-id="order-remove-button"
          onClick={(e) => props.removeOrder(order.id)}
        >
          X
        </button>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
