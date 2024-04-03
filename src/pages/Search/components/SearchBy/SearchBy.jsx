import { capitalize } from "src/utils/common";

const SearchBy = ({
  className,
  ingredients,
  tag,
  nutrient,
  nutrientFromNav,
  ingredientsFromNav,
}) => {
  return (
    <ul className={className}>
      <div>You are searching the recipes by</div>
      {(ingredients && (
        <div>{`Ingredients: ${capitalize(ingredients)}`}</div>
      )) ||
        (ingredientsFromNav && <div></div> && (
          <div>{`Ingredients: ${capitalize(ingredientsFromNav)}`}</div>
        ))}
      {nutrient && nutrient.length > 0 && (
        <div>
          Nutrients:
          {nutrient.map((nut) => (
            <div>
              {`${nut.minOrMax} ${nut.nutrient}-${Math.floor(nut.amount)}${
                nut.scale
              }`}
            </div>
          ))}
        </div>
      )}
      {nutrientFromNav && nutrientFromNav.length > 0 && (
        <div>
          Nutrients:
          {nutrientFromNav.map((nut) => (
            <span>
              {`${nut.minOrMax} ${nut.nutrient}${Math.floor(nut.amount)}${
                nut.scale
              }`}
            </span>
          ))}
        </div>
      )}
      {tag && (
        <div>{`${capitalize(tag[0].key)}: ${capitalize(tag[0].amount)}`}</div>
      )}
    </ul>
  );
};

export default SearchBy;
