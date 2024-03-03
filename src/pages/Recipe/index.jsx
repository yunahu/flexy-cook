import styles from './index.module.css';
import Search from './components/Search';

const RecipePage = () => {

	return (
    <div className={styles.container}>
      <Search />
    </div>
  );
};

export default RecipePage;
