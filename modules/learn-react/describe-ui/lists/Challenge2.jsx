import { recipes } from './Challenge2-data.js';

function Recipe({ recipe }) {
    const listIngredients = recipe.ingredients.map((ingredient =>
        <li key={ingredient}>
            {ingredient}
        </li>
    ))
    return (
        <div>
            <h2>{recipe.name}</h2>
            <ul>
                {listIngredients}
            </ul>
        </div>
    )
}

export default function RecipeList() {
    const listRecipes = recipes.map((recipe =>
        <Recipe recipe={recipe} key={recipe.id}/>
    ))
  return (
    <div>
      <h1>Recipes</h1>
      {listRecipes}
    </div>
  );
}
