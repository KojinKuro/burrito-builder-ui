export function createIngredient(name, cost) {
  return { name, cost };
}

export function findIngredient(ingredientName, ingredients) {
  const foundIngredient = ingredients.find(
    (ingredient) => ingredient.name === ingredientName
  );

  if (!foundIngredient) return createIngredient(ingredientName, 0);
  return foundIngredient;
}

export function findIngredients(ingredientNames, ingredients) {
  return ingredientNames.map((ingredientName) =>
    findIngredient(ingredientName, ingredients)
  );
}

export function calculateTotalCost(ingredients) {
  return ingredients.reduce(
    (totalCost, ingredient) => totalCost + ingredient.cost,
    0
  );
}
