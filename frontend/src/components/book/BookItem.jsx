import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const BookItem = ({book}) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img 
                    className="card-img-top mx-auto" 
                    src={book?.images[0] ? book?.images[0]?.url : '/images/default_product.png'} 
                    alt={book?.name} 
                />
                <div className="card-body ps-3 d-flex justify-content-center flex-column">
                    <h5 className="card-title">
                        <Link to={`/book/${book?._id}`}>{book?.name}</Link>
                    </h5>
                    <div className="ratings mt-auto d-flex">
                        <StarRatings
                            rating={book?.ratings}
                            starRatedColor="#ffb829"
                            numberOfStars={5}
                            name='rating'
                            starDimension='22px'
                            starSpacing='1px'
                        />
                        <span id="no_of_reviews" className="pt-2 ps-2"> {" "} ({book?.numOfReviews}) </span>
                    </div>
                    <p className="card-text mt-2">${book?.price}</p>
                    <Link to={`/book/${book?._id}`} id="view_btn" className="btn btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default BookItem;