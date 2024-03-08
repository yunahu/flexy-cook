import styles from "./index.module.css";
import Search from "./components/Search";

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <Search />
    </div>
  );
};

export default SearchPage;
