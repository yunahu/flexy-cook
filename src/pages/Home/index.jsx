import styles from './index.module.css';
import VerticalCard from 'src/components/Cards/VerticalCard';
import Card from './components/Card';




const Home = () => {
	return (
		<div className={styles.container}>

			<VerticalCard className={styles.lg_sq_card}
            width='30rem'
            height='100%'
            imgURL={'public/sample_pic.jpg' }
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
