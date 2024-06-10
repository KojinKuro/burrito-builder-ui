import { useEffect, useState } from "react";
import OrderForm from "../../components/OrderForm/OrderForm";
import Orders from "../../components/Orders/Orders";
import { deleteOrder, getOrders } from "../../utils/apiCalls";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data.orders));
  }, []);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const removeOrder = (id) => {
    deleteOrder(id).then(() => {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    });
  };

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>

      {/* Here is where orders go */}
      <Orders orders={orders} removeOrder={removeOrder} />
    </main>
  );
}

export default App;
