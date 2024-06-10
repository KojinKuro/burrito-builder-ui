export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} error occurred for getting`);
      } else {
        return response.json();
      }
    })
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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} error occurred for posting`);
      } else {
        return response.json();
      }
    })
    .catch((err) => console.error("Error posting:", err));
};

export const deleteOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} error occurred for deleting`);
      }
    })
    .catch((err) => console.error("Error deleting:", err));
};
