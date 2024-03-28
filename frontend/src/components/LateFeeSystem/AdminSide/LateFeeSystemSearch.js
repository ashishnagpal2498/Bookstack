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
            console.log(data);
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
                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded py-2 px-4 mb-2"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button
                        className="py-2 px-4 rounded bg-navbarBrown hover:bg-hoverNavbarBrown text-white mb-4"
                    >
                        Search
                    </button>
                </div>
                <div className="mt-8">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result) => (
                            <div key={result._id} onClick={() => handleClick(result.user_id)} className="flex flex-row justify-between border border-gray-200 rounded p-4 mb-4 cursor-pointer">
                                <div className='flex flex-row items-start w-0.66    '>
                                    <img src={result.user_picture} alt="User" className="rounded-full" />
                                    <div className='ml-4'>
                                        <p className="text-lg font-bold">{result.user_name}</p>
                                        <p className="">{result.book_name}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center'>
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
