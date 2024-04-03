import styles from "./Home.module.css";
import Large_Square_Card from "./components/LargeSquareCard/LargeSquareCard";
import CarouselBanner from "./components/CarouselBanner/CarouselBanner";
import HorizontalCard from "./components/HorizontalCard/HorizontalCard";
import { Row, Col, Stack } from "react-bootstrap";
import Divider from "src/components/Divider/Divider";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTags,
  createLocationData,
  trimIngredients,
} from "src/utils/spoonacularFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import env from "src/utils/env";

const Home = () => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        axios
          .get(`${env.API_URL}/spoonacular/randomRecipe`, {
            params: { number: 7 },
          })
          .then(async (res) => {
            console.log(res.data.recipes);
            const recipeId = res.data.recipes.map((recipe) => recipe.id);

            const recipeDetail = await Promise.all(
              recipeId.map((id) =>
                Promise.all([
                  axios
                    .get(`${env.API_URL}/spoonacular/getRecipe`, {
                      params: { id, includeNutrition: true },
                    })
                    .then((res) => res.data),
                  axios
                    .get(`${env.API_URL}/spoonacular/getRecipeTaste`, {
                      params: { id, normalize: true },
                    })
                    .then((res) => res.data),
                ])
              )
            );
            setRecipeDetails(recipeDetail);
            console.log(recipeDetail);

            const three_prop = [
              {
                imgURL: recipeDetail[0][0].image,
                title: recipeDetail[0][0].title,
                calories: Math.floor(
                  recipeDetail[0][0].nutrition.nutrients[0].amount
                ),
                time: recipeDetail[0][0].readyInMinutes,
                size: recipeDetail[0][0].servings,
                tags: createTags(recipeDetail[0]),
              },
              {
                imgURL: recipeDetail[1][0].image,
                title: recipeDetail[1][0].title,
                calories: Math.floor(
                  recipeDetail[1][0].nutrition.nutrients[0].amount
                ),
                time: recipeDetail[1][0].readyInMinutes,
                size: recipeDetail[1][0].servings,
                tags: createTags(recipeDetail[1]),
              },
              {
                imgURL: recipeDetail[2][0].image,
                title: recipeDetail[2][0].title,
                calories: Math.floor(
                  recipeDetail[2][0].nutrition.nutrients[0].amount
                ),
                time: recipeDetail[2][0].readyInMinutes,
                size: recipeDetail[2][0].servings,
                tags: createTags(recipeDetail[2]),
              },
            ];

            setFetchLoading(false);
            setThreeProps(three_prop);
            console.log(recipeDetail[0][0].extendedIngredients);
          });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setFetchLoading(true);
      }
    };

    fetchRecipes();
  }, []);

  const [three_props, setThreeProps] = useState({});

  if (fetchLoading) {
    // Added animated spinner as visual aid
    return (
      <div className={styles.msg}>
        <FontAwesomeIcon icon={faSpinner} spinPulse />
        &ensp;Loading recipes...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Row className={styles.recommendation_xl}>
        <Col lg={6} style={{ paddingLeft: 0 }}>
          {/** Large square recommendation card */}
          <Large_Square_Card
            testid="1"
            className={styles.lg_sq_card}
            width={"100%"}
            // height={recipeInfo.height}
            imgURL={recipeDetails[0][0].image}
            title={recipeDetails[0][0].title}
            ingredients={recipeDetails[0][0].extendedIngredients
              .map((ingredient) => ingredient.name)
              .join(", ")}
            time={recipeDetails[0][0].readyInMinutes}
            size={recipeDetails[0][0].servings}
            calories={Math.floor(
              recipeDetails[0][0].nutrition.nutrients[0].amount
            )}
            tags={createTags(recipeDetails[0])}
            onClick={() =>
              navigate(`/recipe/${recipeDetails[0][0].id}`, {
                state: {
                  recipeDetail: createLocationData(
                    recipeDetails[0][0],
                    createTags(recipeDetails[0])
                  ),
                },
              })
            }
          />
        </Col>

        <Col lg={6} style={{ paddingRight: 0 }}>
          {" "}
          {/* Small horizontal recommendation cards x3 */}
          <Stack direction="vertical" gap={3} className={styles.sm_3_cards}>
            <HorizontalCard
              testid="1"
              className={styles.lg_hori_card}
              width={"100%"}
              height={"100%"}
              imgURL={recipeDetails[1][0].image}
              title={recipeDetails[1][0].title}
              ingredients={recipeDetails[1][0].extendedIngredients}
              time={recipeDetails[1][0].readyInMinutes}
              size={recipeDetails[1][0].servings}
              calories={Math.floor(
                recipeDetails[1][0].nutrition.nutrients[0].amount
              )}
              tags={createTags(recipeDetails[1])}
              onClick={() =>
                navigate(`/recipe/${recipeDetails[1][0].id}`, {
                  state: {
                    recipeDetail: createLocationData(
                      recipeDetails[1][0],
                      createTags(recipeDetails[1])
                    ),
                  },
                })
              }
            />
            <HorizontalCard
              testid="2"
              className={styles.lg_hori_card}
              width={"100%"}
              height={"100%"}
              imgURL={recipeDetails[2][0].image}
              title={recipeDetails[2][0].title}
              ingredients={recipeDetails[2][0].extendedIngredients}
              time={recipeDetails[2][0].readyInMinutes}
              size={recipeDetails[2][0].servings}
              calories={Math.floor(
                recipeDetails[2][0].nutrition.nutrients[0].amount
              )}
              tags={createTags(recipeDetails[2])}
              onClick={() =>
                navigate(`/recipe/${recipeDetails[2][0].id}`, {
                  state: {
                    recipeDetail: createLocationData(
                      recipeDetails[2][0],
                      createTags(recipeDetails[2])
                    ),
                  },
                })
              }
            />
            <HorizontalCard
              testid="3"
              className={styles.lg_hori_card}
              width={"100%"}
              height={"100%"}
              imgURL={recipeDetails[3][0].image}
              title={recipeDetails[3][0].title}
              ingredients={recipeDetails[3][0].extendedIngredients}
              time={recipeDetails[3][0].readyInMinutes}
              size={recipeDetails[3][0].servings}
              calories={Math.floor(
                recipeDetails[3][0].nutrition.nutrients[0].amount
              )}
              tags={createTags(recipeDetails[3])}
              onClick={() =>
                navigate(`/recipe/${recipeDetails[3][0].id}`, {
                  state: {
                    recipeDetail: createLocationData(
                      recipeDetails[3][0],
                      createTags(recipeDetails[3])
                    ),
                  },
                })
              }
            />
          </Stack>
        </Col>
      </Row>

      <Row className={styles.recommendation_lg}>
        <Col xs={12}>
          <CarouselBanner
            prop1={three_props[0]}
            onClick1={() =>
              navigate(`/recipe/${recipeDetails[0][0].id}`, {
                state: {
                  recipeDetail: createLocationData(
                    recipeDetails[0][0],
                    createTags(recipeDetails[0])
                  ),
                },
              })
            }
            prop2={three_props[1]}
            onClick2={() =>
              navigate(`/recipe/${recipeDetails[1][0].id}`, {
                state: {
                  recipeDetail: createLocationData(
                    recipeDetails[1][0],
                    createTags(recipeDetails[1])
                  ),
                },
              })
            }
            prop3={three_props[2]}
            onClick3={() =>
              navigate(`/recipe/${recipeDetails[2][0].id}`, {
                state: {
                  recipeDetail: createLocationData(
                    recipeDetails[2][0],
                    createTags(recipeDetails[2])
                  ),
                },
              })
            }
          />
        </Col>
      </Row>

      {/** set label={''} for a not-labeled divider */}
      <Row>
        <Divider width={"100%"} label={"Scroll Down"} labelWidth={"10vw"} />
      </Row>

      <Stack gap={3}>
        {/** horizontal recommendation cards */}
        <HorizontalCard
          testid="4"
          className={styles.lg_hori_card}
          width={"100%"}
          //  height={"22vh"}
          //  minHeight={"230px"}
          imgURL={recipeDetails[4][0].image}
          title={recipeDetails[4][0].title}
          ingredients={recipeDetails[4][0].extendedIngredients}
          time={recipeDetails[4][0].readyInMinutes}
          size={recipeDetails[4][0].servings}
          calories={Math.floor(
            recipeDetails[4][0].nutrition.nutrients[0].amount
          )}
          tags={createTags(recipeDetails[4])}
          onClick={() =>
            navigate(`/recipe/${recipeDetails[4][0].id}`, {
              state: {
                recipeDetail: createLocationData(
                  recipeDetails[4][0],
                  createTags(recipeDetails[4])
                ),
              },
            })
          }
        />
        <HorizontalCard
          testid="5"
          className={styles.lg_hori_card}
          width={"100%"}
          //  height={"22vh"}
          //  minHeight={"230px"}
          imgURL={recipeDetails[5][0].image}
          title={recipeDetails[5][0].title}
          ingredients={recipeDetails[5][0].extendedIngredients}
          time={recipeDetails[5][0].readyInMinutes}
          size={recipeDetails[5][0].servings}
          calories={Math.floor(
            recipeDetails[5][0].nutrition.nutrients[0].amount
          )}
          tags={createTags(recipeDetails[5])}
          onClick={() =>
            navigate(`/recipe/${recipeDetails[5][0].id}`, {
              state: {
                recipeDetail: createLocationData(
                  recipeDetails[5][0],
                  createTags(recipeDetails[5])
                ),
              },
            })
          }
        />
        <HorizontalCard
          testid="6"
          className={styles.lg_hori_card}
          width={"100%"}
          //  height={"22vh"}
          //  minHeight={"230px"}
          imgURL={recipeDetails[6][0].image}
          title={recipeDetails[6][0].title}
          ingredients={recipeDetails[6][0].extendedIngredients}
          time={recipeDetails[6][0].readyInMinutes}
          size={recipeDetails[6][0].servings}
          calories={Math.floor(
            recipeDetails[6][0].nutrition.nutrients[0].amount
          )}
          tags={createTags(recipeDetails[6])}
          onClick={() =>
            navigate(`/recipe/${recipeDetails[6][0].id}`, {
              state: {
                recipeDetail: createLocationData(
                  recipeDetails[6][0],
                  createTags(recipeDetails[6])
                ),
              },
            })
          }
        />
      </Stack>
    </div>
  );
};

export default Home;
