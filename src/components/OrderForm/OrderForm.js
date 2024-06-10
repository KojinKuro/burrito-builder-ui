import { useState } from "react";
import { possibleIngredients } from "../../data/ingredients";
import { postOrder } from "../../utils/apiCalls";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) return;
    if (!ingredients.length) return;

    postOrder({ name, ingredients, totalCost }).then(props.addOrder);
    resetForm();
  }

  function handleIngredient(ingredient) {
    const matchingIngredients = ingredients.filter(
      (ingredientName) => ingredientName === ingredient.name
    );
    if (matchingIngredients.length >= 2) return;

    setIngredients((prevIngredients) => [...prevIngredients, ingredient.name]);
    setTotalCost((prevTotalCost) => prevTotalCost + ingredient.cost);
  }

  function resetForm() {
    setName("");
    setIngredients([]);
    setTotalCost(0);
  }

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient.name}
        name={ingredient.name}
        onClick={(e) => {
          e.preventDefault();
          handleIngredient(ingredient);
        }}
        data-test-id="ingredient-button"
      >
        {ingredient.name}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p data-test-id="order-display">
        Order: {ingredients.join(", ") || "Nothing selected"}
      </p>
      <p data-test-id="order-cost">Total Cost: ${totalCost.toFixed(2)}</p>

      <button
        data-test-id="form-submit-button"
        onClick={(e) => handleSubmit(e)}
      >
        Submit Order
      </button>
    </form>
  );
}

export default OrderForm;
