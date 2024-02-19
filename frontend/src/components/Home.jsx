import React from 'react';
import MetaData from './layouts/MetaData';
import { useGetBooksQuery } from '../redux/api/booksApi';
import BookItem from './book/BookItem';
import Loader from './layouts/Loader';

const Home = () => {
	const { data, isLoading } = useGetBooksQuery();

	if (isLoading) return <Loader />

	return (
		<>
			<MetaData title={'Buy best books online'} />
			<div className="row">
				<div className="col-12 col-sm-6 col-md-12">
					<h1 id="products_heading" className="text-secondary">Latest Books</h1>

					<section id="products" className="mt-5">
						<div className="row">
							{data?.books.map((book) => (
								<BookItem book={book} />
							))}
						</div>
					</section>
				</div>
			</div>
		</>
	);
}

export default Home;