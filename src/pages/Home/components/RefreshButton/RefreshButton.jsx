import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "src/pages/Home/components/RefreshButton/RefreshButton.module.css";

const map = {
  primary: styles["btn-primary"],
};

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
      className={map["primary"]}
      disabled={isRefreshing}
      onClick={!isRefreshing ? handleClick : null}
    >
      {isRefreshing ? "Refreshing..." : "Refresh Recipes"}
    </Button>
  );
};

export default RefreshButton;
