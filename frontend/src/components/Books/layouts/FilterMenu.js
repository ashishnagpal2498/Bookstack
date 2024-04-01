// Ashish Nagpal
import React, { useEffect, useState } from 'react';
import FilterBtn from './FilterBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';  // Import axios to make API requests
import { backend_url } from '../../../util/config';

const FilterMenu = ({ toggleFilterMenu, handleFilterCheckbox, selectedFilters }) => {

    const [openCategory, setOpenCategory] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishedYears] = useState([2011, 2010, 2009, 2008, 2007, 2006, 2005]);

    const toggleCategory = (category) => {
        openCategory.includes(category) ? setOpenCategory(openCategory.filter(cat => cat !== category)) : setOpenCategory([...openCategory, category]);
    };

    const menuOpen = (category) => openCategory.includes(category)

    const handleCheckboxChange = (category, value) => {
        handleFilterCheckbox(category, value)
    };

    useEffect(() => {
        axios.get(`${backend_url}/books/genres`)
            .then(response => {
                if (response.data.status) {
                    const fetchedGenres = response.data.data.map(genre => genre.name);
                    setGenres(fetchedGenres);
                }
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });

        axios.get(`${backend_url}/books/authors`)
            .then(response => {
                if (response.data.status) {
                    const fetchedAuthors = response.data.data.map(author => author.name);
                    setAuthors(fetchedAuthors);
                }
            })
            .catch(error => {
                console.error("Error fetching authors:", error);
            });
    }, []);

    return (
        <div className='filter-options-container'>
            <FilterBtn sideBtn={true} toggleFilterMenu={toggleFilterMenu} />
            <ul className='filter-options-list'>
                <li>
                    <div onClick={() => toggleCategory('genres')}>
                        <span className='filter-heading-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="book"><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="M52.655 360.043c37.609 3.443 76.534 13.048 115.294 28.813V429.4L9 401.127V64.931l43.655 7.758V360.043zM255.904 436.516v8.526l-31.946-5.684v-23.275c10.714 6.078 21.345 12.643 31.883 19.686v.83C255.862 436.568 255.883 436.547 255.904 436.516z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="M257.099 117.709v318.893l-.598-.105-.344-.06-.179-.03-.075-.015-.06-.015V119.205c.015-.03.045-.06.06-.09v-1.616l.09.015.165.03.344.06.404.075L257.099 117.709zM83.761 326.553c24.644-.529 54.349 7.883 84.189 25.235v37.069c-38.76-15.765-77.686-25.37-115.294-28.813V41.159c10.279.933 20.661 2.344 31.105 4.211C83.761 45.37 83.761 326.553 83.761 326.553zM255.841 434.701v1.068c-10.538-7.043-21.169-13.608-31.883-19.686v-20.194C235.17 407.391 245.905 420.335 255.841 434.701z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M257.099,117.709v318.893c-0.09-0.06-0.165-0.119-0.254-0.165c-0.119-0.09-0.224-0.165-0.344-0.24
			c-0.09-0.06-0.179-0.119-0.27-0.165c-0.105-0.09-0.224-0.165-0.329-0.224c-0.015-0.015-0.045-0.03-0.06-0.045V119.205
			c0.015-0.03,0.045-0.06,0.06-0.09v-1.721c-0.195-0.3-0.389-0.598-0.613-0.883c0.21,0.119,0.403,0.254,0.613,0.403
			c0.194,0.119,0.403,0.254,0.598,0.389c0.119,0.075,0.224,0.149,0.344,0.24c0.03,0.015,0.075,0.045,0.105,0.06
			C256.995,117.65,257.055,117.68,257.099,117.709z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M255.904,117.392v1.722c-0.021,0.031-0.041,0.062-0.062,0.093V434.7c-9.936-14.365-20.671-27.309-31.883-38.812
			c-17.871-18.338-36.966-33.045-56.008-44.101c-29.84-17.352-59.545-25.764-84.189-25.235V9.151
			c47.949-1.006,115.076,31.811,165.1,98.44c2.178,2.904,4.335,5.881,6.431,8.92C255.509,116.801,255.707,117.092,255.904,117.392z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M257.16,119.205v317.396c-0.015-0.03-0.045-0.06-0.06-0.09c-0.03-0.03-0.045-0.075-0.075-0.105
			c-0.09-0.119-0.165-0.254-0.254-0.374c-0.09-0.135-0.179-0.254-0.27-0.374c-0.195-0.299-0.389-0.583-0.598-0.868
			c0-0.03-0.03-0.06-0.06-0.09V119.205c0.015-0.03,0.045-0.06,0.06-0.09v-1.721c0.045,0.045,0.075,0.075,0.09,0.119
			c0.03,0.03,0.045,0.06,0.06,0.09c0.03,0.03,0.045,0.045,0.045,0.075c0.149,0.195,0.284,0.389,0.403,0.584
			c0.21,0.284,0.403,0.568,0.598,0.853C257.114,119.145,257.144,119.175,257.16,119.205z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M504,64.927V401.13l-246.901,43.91v-8.528c0.015,0.03,0.045,0.06,0.06,0.09v-0.838c66.397-44.389,136.848-69.643,203.185-75.717
			V72.691L504,64.927z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M257.16,119.205v317.172l-0.06,0.015l-0.075,0.015l-0.179,0.03l-0.344,0.06l-0.598,0.105V117.709l0.194-0.03l0.403-0.075
			l0.344-0.06l0.165-0.03l0.09-0.015v1.616C257.114,119.145,257.144,119.175,257.16,119.205z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M460.344,41.154v318.893c-66.337,6.074-136.788,31.328-203.185,75.717v-1.062c50.598-73.174,121.857-109.215,172.081-108.153
			V45.373C439.683,43.503,450.066,42.096,460.344,41.154z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="
			M257.099,119.115c0.015,0.03,0.045,0.06,0.06,0.09v316.558c-0.015,0.015-0.045,0.03-0.06,0.045
			c-0.105,0.06-0.224,0.135-0.329,0.224c-0.09,0.045-0.179,0.105-0.27,0.165c-0.119,0.075-0.224,0.149-0.344,0.24
			c-0.09,0.045-0.165,0.105-0.254,0.165V117.709c0.045-0.03,0.105-0.06,0.149-0.105c0.03-0.015,0.075-0.045,0.105-0.06
			c0.119-0.09,0.224-0.165,0.344-0.24c0.195-0.135,0.403-0.27,0.598-0.389c0.21-0.149,0.404-0.284,0.613-0.403
			c-0.224,0.284-0.419,0.583-0.613,0.883v1.72H257.099z"></path><path fill="none" stroke="#464668" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="M429.24 9.152v317.396c-50.224-1.062-121.483 34.978-172.081 108.153V119.205c-.015-.03-.045-.06-.06-.09v-1.721c.195-.3.389-.598.613-.883 2.11-3.037 4.249-6.015 6.448-8.917C314.175 40.96 381.291 8.15 429.24 9.152zM223.958 395.889v107.982l-28.004-28.004-28.004 28.004V351.787C186.993 362.844 206.087 377.551 223.958 395.889z"></path></svg>
                        </span>
                        <h4>Genres</h4>
                        {menuOpen('genres') ? <i className="arrow up"></i> : <i className="arrow down"></i>}
                    </div>
                    {openCategory.includes('genres') && (
                        <ul className='filter-options-sub-list'>
                            {genres.map(genre => (
                                <li key={genre}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.genreIds.includes(genre)}
                                            onChange={() => handleCheckboxChange('genreIds', genre)}
                                        />
                                        {genre}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleCategory('authors')}>
                        <span className='filter-heading-icon'>
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                        <h4>Authors</h4>
                        {menuOpen('authors') ? <i className="arrow up"></i> : <i className="arrow down"></i>}
                    </div>
                    {openCategory.includes('authors') && (
                        <ul className='filter-options-sub-list'>
                            {authors.map(authorVal => (
                                <li key={authorVal}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.authorIds.includes(authorVal)}
                                            onChange={() => handleCheckboxChange('authorIds', authorVal)}
                                        />
                                        {authorVal}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                <li>
                    <div onClick={() => toggleCategory('publishedYear')}>
                        <span className='filter-heading-icon'>
                            <FontAwesomeIcon icon={faCalendarDays} />
                        </span>
                        <h4>Published Year</h4>
                        {menuOpen('publishedYear') ? <i className="arrow up"></i> : <i className="arrow down"></i>}
                    </div>
                    {openCategory.includes('publishedYear') && (
                        <ul className='filter-options-sub-list'>
                            {publishedYears.map(year => (
                                <li key={year}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.publishedYear.includes(year)}
                                            onChange={() => handleCheckboxChange('publishedYear', year)}
                                        />
                                        {year}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default FilterMenu;
