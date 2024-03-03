import React, { useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useGetBooksQuery } from '../redux/api/booksApi';
import BookItem from './book/BookItem';
import Loader from './layouts/Loader';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from './layouts/CustomPagination';
import Filters from './layouts/Filters';

const Home = () => {
	let [searchParams] = useSearchParams();
	let page = searchParams.get("page") || 1;
	const keyword = searchParams.get("keyword") || "";
	let min = searchParams.get("min");
	let max = searchParams.get("max");
	let category = searchParams.get("category");
	let ratings = searchParams.get("ratings");
	const params = { page, keyword };

	min !== null && (params.min = min);
	max !== null && (params.max = max);
	category !== null && (params.category = category);
	ratings !== null && (params.ratings = ratings);

	const { data, isLoading, error, isError } = useGetBooksQuery(params);

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [error]);

	const columnSize = keyword ? 4 : 3;

	if (isLoading) return <Loader />

	return (
		<>
			<MetaData title={'Buy best books online'} />
			<div className="row">
				{keyword && (
					<div className='col-6 col-md-3 mt-5'>
						<Filters />
					</div>
				)}
				<div className={keyword ? "col-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>
					<h1 id="products_heading" className="text-secondary">
                        {keyword
                            ? `${data?.books?.length}  ${data?.books?.length > 1 ? "Books" : "Book"} found with keyword : ${keyword}`
                            : "Latest Products"}
                    </h1>

					<section id="products" className="mt-5">
						<div className="row">
							{data?.books.map((book) => (
								<BookItem book={book} columnSize={columnSize} />
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