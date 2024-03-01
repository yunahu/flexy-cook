import Button from 'react-bootstrap/Button';
import CardBootstrap from 'react-bootstrap/Card';
import InfoSection from 'src/components/Cards/InfoSection';

const Card = () => {
   return (
      <CardBootstrap style={{ width: '18rem' }}>
         <CardBootstrap.Img variant="top" src="holder.js/100px180" />
         <CardBootstrap.Body>
            <CardBootstrap.Title>Card Title</CardBootstrap.Title>
            <CardBootstrap.Text>
               Some quick example text to build on the card title and make up the bulk of the card's content.
            </CardBootstrap.Text>
            <InfoSection info={{ equip:'Oven', time:'40 minutes', size:'2 servings' }}
               tags={[{text:'Tag 1', color:'danger'},
                        {text: 'Tag 2', color:'success'},
                        {text: 'Tag 3', color:'warning'}]}/>
            <Button variant='success'>Check It Out</Button>
         </CardBootstrap.Body>
      </CardBootstrap>
   );
};

export default Card;