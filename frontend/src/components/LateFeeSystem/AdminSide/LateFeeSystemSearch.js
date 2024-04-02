// Author - Abhinav Acharya Tirumala Vinjamuri
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveLateFeesUsers } from '../../../services/LateFeeSystem';

function LateFeeSystemSearch() {
    const navigate = useNavigate();
    const [apiResults, setApiResults] = useState([]);
    const [apiMessage, setApiMessage] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getActiveLateFeesUsers();
            // console.log(data);
            setApiResults(data.users);
            setApiMessage(data.message);
        };
        fetchData();
    }
        // eslint-disable-line react-hooks/exhaustive-deps
        , []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredResults(apiResults);
        } else {
            const newFilteredResults = apiResults.filter(item =>
                item.user_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(newFilteredResults);
        }
    }, [searchQuery, apiResults]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClick = (user_id) => {
        navigate('/latefee/details', { state: { user_id } });
    };

    return (
        <div className='bg-aboutUsBrown h-full py-8'>
            <div className="container-xl mx-auto px-4 py-8 text-black bg-white rounded-lg">
                <div className="flex flex-col relative ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded py-2 px-4"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <svg className='absolute top-0 right-0' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{"mix-blend-mode": "normal"}}><g transform="scale(5.33333,5.33333)"><path transform="translate(-15.15512,36.5872) rotate(-45.001)" d="M34.6,28.1h4v17h-4z" fill="#fce8c7"></path><path d="M20,4c-8.83656,0 -16,7.16344 -16,16c0,8.83656 7.16344,16 16,16c8.83656,0 16,-7.16344 16,-16c0,-8.83656 -7.16344,-16 -16,-16z" fill="#fce8c7"></path><path transform="translate(-15.83953,38.24094) rotate(-45.001)" d="M36.2,32.1h4v12.3h-4z" fill="#6e4801"></path><path d="M20,7c-7.1797,0 -13,5.8203 -13,13c0,7.1797 5.8203,13 13,13c7.1797,0 13,-5.8203 13,-13c0,-7.1797 -5.8203,-13 -13,-13z" fill="#6e4801"></path><path d="M26.9,14.2c-1.7,-2 -4.2,-3.2 -6.9,-3.2c-2.7,0 -5.2,1.2 -6.9,3.2c-0.4,0.4 -0.3,1.1 0.1,1.4c0.4,0.4 1.1,0.3 1.4,-0.1c1.4,-1.6 3.3,-2.5 5.4,-2.5c2.1,0 4,0.9 5.4,2.5c0.2,0.2 0.5,0.4 0.8,0.4c0.2,0 0.5,-0.1 0.6,-0.2c0.4,-0.4 0.4,-1.1 0.1,-1.5z" fill="#fce8c7"></path></g></g>
                    </svg>
                </div>
                <div className="mt-8">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result) => (
                            <div key={result._id} onClick={() => handleClick(result.user_id)} className="flex flex-col sm:flex-row justify-between border border-gray-200 rounded p-4 mb-4 cursor-pointer">
                                <div className='flex flex-row items-start w-0.66'>
                                    <img src={result.user_picture} alt="User" className="rounded-full w-[100px] h-[100px]" />
                                    <div className='ml-4'>
                                        <p className="text-lg font-bold">{result.user_name}</p>
                                        <p className="">{result.book_name}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col ml-[7.25rem] md:ml-auto md:justify-center'>
                                    <p className="text-lg font-bold text-hoverNavbarBrown">${result.amount}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-muted'>{apiMessage}</p>
                    )}
                </div>
            </div>
        </div>

    );
}

export default LateFeeSystemSearch;
