import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) return;
    if (!ingredients.length) return;

    postOrder({ name, ingredients }).then(props.addOrder);
    clearInputs();
  }

  function addIngredient(ingredientName) {
    const matchingIngredients = ingredients.filter(
      (ingredient) => ingredient === ingredientName
    );

    if (matchingIngredients.length >= 2) return;
    setIngredients((prevIngredients) => [...prevIngredients, ingredientName]);
  }

  function handleIngredient(e) {
    e.preventDefault();
    addIngredient(e.target.name);
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => handleIngredient(e)}
        data-test-id="ingredient-button"
      >
        {ingredient}
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
