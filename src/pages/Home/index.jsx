import styles from './index.module.css';
import VerticalCard from './components/LargeSquareCard';
import Large_Square_Card from './components/LargeSquareCard';

const API_Response_Simulator = () => {
   
}


const Home = () => {
	return (
		<div className={styles.container}>
         
         <Large_Square_Card className={styles.lg_sq_card}
            width='30rem'
            height='200px'
            // imgURL={'src/assets/images/sample-pic-horizontal.jpg' }
            imgURL={'src/assets/images/sample_pic.jpg' }
            title={'Some Random Recipe'}
            description={'This is recipe description blablabla ... '}
            info={{ equip:'Oven', time:'40 minutes', size:'2 servings' }}
            tags={[{text:'Tag 1', color:'danger'},
                  {text: 'Tag 2', color:'success'},
                  {text: 'Tag 3', color:'warning'}]} />
         

		</div>
	);
};

export default Home;
