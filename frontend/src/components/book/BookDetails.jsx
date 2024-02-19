import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookDetailsQuery } from '../../redux/api/booksApi';
import Loader from '../layouts/Loader';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';

const BookDetails = () => {
    const params = useParams();
    const { data, isLoading, error, isError } = useGetBookDetailsQuery(params?.id)
    const book = data?.book;
    const [activeImage, setActiveImage] = useState('');

    useEffect(() => {
        setActiveImage(book?.images[0] ? book?.images[0]?.url : '/images/default_product.png');
    }, [error])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [error]);

    if (isLoading) return <Loader />

    return (
        <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div className="p-3">
                    <img 
                        className="d-block w-100" 
                        src={activeImage} 
                        alt={book?.name} 
                        width="340" 
                        height="390" 
                    />
                </div>
                <div className="row justify-content-start mt-5">
                    {book?.images?.map((image) => (
                        <div className="col-2 mx-3 mt-2">
                            <a role="button">
                                <img 
                                    className={`d-block border rounded p-3 cursor-pointer ${image?.url === activeImage ? "border-primary": ""}`}
                                    height="100" 
                                    width="100"
                                    src={image?.url} 
                                    alt={image?.url}
                                    onClick={(e) => setActiveImage(image?.url)}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{book?.name}</h3>
                <p id="product_id">Book # {book?.isbn}</p>
                <p id="product_id">Write by # {book?.author}</p>

                <hr />

                <div className="d-flex">
                    <StarRatings
                        rating={book?.ratings}
                        starRatedColor="#ffb829"
                        numberOfStars={5}
                        name='rating'
                        starDimension='22px'
                        starSpacing='1px'
                    />
                    <span id="no-of-reviews" className="pt-1 ps-2"> 
                        {" "}
                        ({book?.numOfReviews} Reviews) {" "}
                    </span>
                </div>
                <hr />

                <p id="product_price">${book?.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>
                    <input type="number" className="form-control count d-inline" value="1" readonly />
                    <span className="btn btn-primary plus">+</span>
                </div>
                <button type="button" id="cart_btn" className="btn btn-primary d-inline mx-4" disabled="">
                    Add to Cart
                </button>

                <hr />

                <p>
                    Status: 
                    <span id="stock_status" className={book?.stock > 0 ? "greenColor" : "redColor"}>
                        {book?.stock > 0 ? "In Stock" : "Out Of Stock"}
                    </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>
                    {book?.description}
                </p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{book?.seller}</strong></p>

                <div className="alert alert-danger my-5" type="alert">
                    Login to post your review.
                </div>
            </div>
        </div>
    );
}

export default BookDetails;