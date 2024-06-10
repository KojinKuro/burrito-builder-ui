import { useEffect, useState } from "react";
import { getOrders } from "../../apiCalls";
import OrderForm from "../../components/OrderForm/OrderForm";
import Orders from "../../components/Orders/Orders";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data.orders));
  }, []);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>

      {/* Here is where orders go */}
      <Orders orders={orders} />
    </main>
  );
}

export default App;
