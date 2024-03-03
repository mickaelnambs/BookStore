import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword?.trim()) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate(`/`);
        }
    }

    return (  
        <form onSubmit={submitHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    aria-describedby="search_btn"
                    className="form-control me-sm-2"
                    placeholder="Enter Product Name ..."
                    name="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button class="btn btn-primary my-2 my-sm-0" type="submit">
                    <i className='fa fa-search'></i>
                </button>
            </div>
        </form>
    );
}
 
export default Search;