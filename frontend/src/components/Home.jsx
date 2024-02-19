import React, { useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useGetBooksQuery } from '../redux/api/booksApi';
import BookItem from './book/BookItem';
import Loader from './layouts/Loader';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from './layouts/CustomPagination';

const Home = () => {
	let [searchParams] = useSearchParams();
	let page = searchParams.get("page") || 1;
	const params = { page };
	const { data, isLoading, error, isError } = useGetBooksQuery(params);

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [error])

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
					<CustomPagination 
						resPerPage={data?.resPerPage}
						filteredBooksCount={data?.filteredBooksCount}
					/>
				</div>
			</div>
		</>
	);
}

export default Home;