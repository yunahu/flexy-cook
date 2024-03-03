import styles from "./index.module.css";
import LargeSquareCard from "./components/LargeSquareCard/LargeSquareCard";
import CarouselBanner from "./components/CarouselBanner";
import SingleCarousel from "./components/CarouselBanner/SingleCarousel";

const dummyData = {
  /** A dummy object with present data */
  width: "30rem",
  height: "400rem" /** must be px/rem value */,
  // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
  imgURL: "src/assets/images/sample_pic.jpg",
  title: "Some Random Recipe",
  time: 45,
  size: 2,
  calories: 300,
  ingredients:
    "1 cup of sugar, 2 cups of flour, 3 eggs, 4 cups of milk, 5 cups of water, 6 cups of oil, 7 cups of salt",
  tags: [
    { text: "Tag 1", type: "danger" },
    { text: "Tag 2", type: "success" },
    { text: "Tag 3", type: "warning" },
  ],
};

const Home = () => {
  const recipeInfo = dummyData;

  return (
    <div className={styles.container}>
      {/* <LargeSquareCard
        className={styles.lg_sq_card}
        width={recipeInfo.width}
        height={recipeInfo.height}
        imgURL={recipeInfo.imgURL}
        title={recipeInfo.title}
        calories={recipeInfo.calories}
        time={recipeInfo.time}
        size={recipeInfo.size}
        ingredients={recipeInfo.ingredients}
        tags={recipeInfo.tags}
      /> */}

      <SingleCarousel
            height={recipeInfo.height}
            img={recipeInfo.imgURL}
            title={recipeInfo.title}
            info={recipeInfo.info}
            tags={recipeInfo.tags}
         />

      {/* <CarouselBanner item1={recipeInfo} item2={recipeInfo} item3={recipeInfo}/> */}
    </div>
  );
};

export default Home;
