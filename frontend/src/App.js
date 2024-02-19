import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Header />
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
