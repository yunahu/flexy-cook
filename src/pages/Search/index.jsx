import styles from './index.module.css';
import Search from './components/Search';
 
// <div>
//   <input type="text" placeholder="Search" />
//   <button>Search</button>
// </div>;

const SearchPage = () => {

	return (
    <div className={styles.container}>
      <Search />
    </div>
  );
};

export default SearchPage;
