import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const RefreshButton = ({ fetchRecipe, onClick }) => {
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      fetchRecipe().then(() => {
        setRefreshing(false);
      });
    }
  }, [isRefreshing]);

  const handleClick = () => {
    setRefreshing(true);
    if (typeof onClick === "function") onClick();
  };

  return (
    <Button
      variant="primary"
      disabled={isRefreshing}
      onClick={!isRefreshing ? handleClick : null}
    >
      {isRefreshing ? "Refreshing..." : "Click to refresh"}
    </Button>
  );
};

export default RefreshButton;
