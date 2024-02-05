import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Router from './Router';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  return (
		<div>
			<Navbar />
			<Router />
			<Footer />
		</div>
  );
};

export default App;
