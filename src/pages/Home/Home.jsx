import styles from './Home.module.css';
import Large_Square_Card from './components/LargeSquareCard/LargeSquareCard';
import CarouselBanner from './components/CarouselBanner/CarouselBanner';
import SingleCarousel from './components/CarouselBanner/SingleCarousel/SingleCarousel';
import HorizontalCard from './components/HorizontalCard/HorizontalCard';
import { Row, Col, Stack } from 'react-bootstrap';


const dummyData = () => {
   return { /** A dummy object with present data */
      width: '30rem',
      height: '40vh',  /** must be px/rem value */
      imgURL: 'src/assets/images/sample-pic-horizontal.jpg',
      // imgURL: 'src/assets/images/sample_pic.jpg',
      title: 'Some Random Recipe',
      description: 'This is recipe description blablabla ... ',
      info: {
         equip:'Oven',
         time:'40 minutes',
         size:'2 servings'
      },
      tags: [
               {text:'Tag 1', color:'danger'},
               {text: 'Tag 2', color:'success'},
               {text: 'Tag 3', color:'warning'}
            ]
   };
};


const Home = () => {
   const recipeInfo = dummyData();

	return (
		<div className={styles.container}>

         <Row className={'recommendation-lg'}>
            <Col lg={6}>
               <Large_Square_Card className={styles.lg_sq_card}
                  width={recipeInfo.width}
                  height={recipeInfo.height}
                  imgURL={recipeInfo.imgURL}
                  title={recipeInfo.title}
                  description={recipeInfo.description}
                  info={recipeInfo.info}
                  tags={recipeInfo.tags}
               />
            </Col>

            <Col lg={6}>
               {/* small horizontal cards here */}
            </Col>
            
         </Row>

         <Row className={'recommendation-md'}>
            <Col xs={12}>
               {/* <SingleCarousel
                  height={recipeInfo.height}
                  img={recipeInfo.imgURL}
                  title={recipeInfo.title}
                  info={recipeInfo.info}
                  tags={recipeInfo.tags}
               /> */}

               {/* <CarouselBanner item1={recipeInfo} item2={recipeInfo} item3={recipeInfo}/> */}
            </Col>
         </Row>

         <Row><hr></hr></Row>

         <Stack>
            <HorizontalCard className={styles.lg_hori_card}
                  width={'100%'}
                  height={'30vh'}
                  imgURL={recipeInfo.imgURL}
                  title={recipeInfo.title}
                  description={recipeInfo.description}
                  info={recipeInfo.info}
                  tags={recipeInfo.tags}
            />
            <HorizontalCard className={styles.lg_hori_card}
                  width={'100%'}
                  height={'30vh'}
                  imgURL={recipeInfo.imgURL}
                  title={recipeInfo.title}
                  description={recipeInfo.description}
                  info={recipeInfo.info}
                  tags={recipeInfo.tags}
            />
            <HorizontalCard className={styles.lg_hori_card}
                  width={'100%'}
                  height={'30vh'}
                  imgURL={recipeInfo.imgURL}
                  title={recipeInfo.title}
                  description={recipeInfo.description}
                  info={recipeInfo.info}
                  tags={recipeInfo.tags}
            />

         </Stack>
         


		</div>
	);
};

export default Home;
