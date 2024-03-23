import styles from "./Home.module.css";
import Large_Square_Card from "./components/LargeSquareCard/LargeSquareCard";
import CarouselBanner from "./components/CarouselBanner/CarouselBanner";
import HorizontalCard from "./components/HorizontalCard/HorizontalCard";
import { Row, Col, Stack } from "react-bootstrap";
import Divider from "src/components/Divider/Divider";
import StickyButton from "src/components/StickyButton/StickyButton.jsx";

const dummyData = () => {
  return {
    /** A dummy object with present data */
    // width: '30rem',
    // height: '40vh',  /** must be px/rem value */
    imgURL:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    // imgURL: 'src/assets/images/sample_pic.jpg',
    title: "Some Random Recipe",
    ingredients: "onion",
    calories: "200",
    time: "40",
    size: "2",

    tags: [
      { text: "Tag 1", type: "danger" },
      { text: "Tag 2", type: "success" },
      { text: "Tag 3", type: "warning" },
    ],
  };
};

const Home = () => {
  const recipeInfo = dummyData();

  return (
    <>
      <div className={styles.container}>
        <Row className={styles.recommendation_xl}>
          <Col lg={6} style={{ paddingLeft: 0 }}>
            {" "}
            {/** Large square recommendation card */}
            <Large_Square_Card
              className={styles.lg_sq_card}
              width={"100%"}
              // height={recipeInfo.height}
              imgURL={recipeInfo.imgURL}
              title={recipeInfo.title}
              time={recipeInfo.time}
              calories={recipeInfo.calories}
              size={recipeInfo.size}
              tags={recipeInfo.tags}
            />
          </Col>

          <Col lg={6} style={{ paddingRight: 0 }}>
            {" "}
            {/** Small horizontal recommendation cards x3 */}
            <Stack direction="vertical" gap={3} className={styles.sm_3_cards}>
              <HorizontalCard
                className={styles.lg_hori_card}
                width={"100%"}
                height={"100%"}
                imgURL={recipeInfo.imgURL}
                title={recipeInfo.title}
                time={recipeInfo.time}
                calories={recipeInfo.calories}
                size={recipeInfo.size}
                tags={recipeInfo.tags}
              />
              <HorizontalCard
                className={styles.lg_hori_card}
                width={"100%"}
                height={"100%"}
                imgURL={recipeInfo.imgURL}
                title={recipeInfo.title}
                time={recipeInfo.time}
                calories={recipeInfo.calories}
                size={recipeInfo.size}
                tags={recipeInfo.tags}
              />
              <HorizontalCard
                className={styles.lg_hori_card}
                width={"100%"}
                height={"100%"}
                imgURL={recipeInfo.imgURL}
                title={recipeInfo.title}
                time={recipeInfo.time}
                calories={recipeInfo.calories}
                size={recipeInfo.size}
                tags={recipeInfo.tags}
              />
            </Stack>
          </Col>
        </Row>

        <Row className={styles.recommendation_lg}>
          <Col xs={12}>
            <CarouselBanner
              prop1={recipeInfo}
              prop2={recipeInfo}
              prop3={recipeInfo}
            />
          </Col>
        </Row>

        {/** set label={''} for a not-labeled divider */}
        <Row>
          <Divider width={"100%"} label={"Scroll Down"} labelWidth={"10vw"} />
        </Row>

        <Stack gap={3}>
          {" "}
          {/** horizontal recommendation cards */}
          <HorizontalCard
            className={styles.lg_hori_card}
            width={"100%"}
            height={"22vh"}
            minHeight={"200px"}
            imgURL={recipeInfo.imgURL}
            title={recipeInfo.title}
            time={recipeInfo.time}
            calories={recipeInfo.calories}
            size={recipeInfo.size}
            tags={recipeInfo.tags}
          />
          <HorizontalCard
            className={styles.lg_hori_card}
            width={"100%"}
            height={"22vh"}
            minHeight={"200px"}
            imgURL={recipeInfo.imgURL}
            title={recipeInfo.title}
            time={recipeInfo.time}
            calories={recipeInfo.calories}
            size={recipeInfo.size}
            tags={recipeInfo.tags}
          />
          <HorizontalCard
            className={styles.lg_hori_card}
            width={"100%"}
            height={"22vh"}
            minHeight={"200px"}
            imgURL={recipeInfo.imgURL}
            title={recipeInfo.title}
            time={recipeInfo.time}
            calories={recipeInfo.calories}
            size={recipeInfo.size}
            tags={recipeInfo.tags}
          />
        </Stack>
      </div>
      <StickyButton />
    </>
  );
};

export default Home;
