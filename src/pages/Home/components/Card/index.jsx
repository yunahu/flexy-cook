import Button from "react-bootstrap/Button";
import CardBootstrap from "react-bootstrap/Card";

const Card = () => {
  return (
    <CardBootstrap style={{ width: "18rem" }}>
      <CardBootstrap.Img variant="top" src="holder.js/100px180" />
      <CardBootstrap.Body>
        <CardBootstrap.Title>Card Title</CardBootstrap.Title>
        <CardBootstrap.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </CardBootstrap.Text>
        <Button variant="primary">Go somewhere</Button>
      </CardBootstrap.Body>
    </CardBootstrap>
  );
};

export default Card;
