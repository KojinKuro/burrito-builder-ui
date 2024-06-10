import { useEffect } from "react";
import { getOrders } from "../../apiCalls";
import OrderForm from "../../components/OrderForm/OrderForm";
import Orders from "../../components/Orders/Orders";
import "./App.css";

function App() {
  useEffect(() => {
    getOrders().catch((err) => console.error("Error fetching:", err));
  });

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      {/* Here is where orders go */}
      <Orders orders={[]} />
    </main>
  );
}

export default App;
