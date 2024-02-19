import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BookDetails from './components/book/BookDetails';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Toaster position='top-center' />
				<Header />
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/book/:id' element={<BookDetails />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
