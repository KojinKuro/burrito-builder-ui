export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then((response) => response.json())
    .catch((err) => console.error("Error fetching:", err));
};

// {name: <String>, ingredients: <Array of Strings>}
export const postOrder = (order) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error("Error posting:", err));
};
