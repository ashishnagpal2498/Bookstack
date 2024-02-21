import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LateFeeSystemSearch() {
    const navigate = useNavigate();
    // Redundancy to allow list to get restored when search is cleared or empty
    const originalSearchResults = [
        { id: 1, user: { name: 'John Doe', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 1', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$120" },
        { id: 2, user: { name: 'Jane Smith', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 2', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$150" },
        { id: 3, user: { name: 'Jen Smith', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 3', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$119" },
        { id: 4, user: { name: 'Jon Smith', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 4', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$10" },
        { id: 5, user: { name: 'Jane Doe', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 5', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$2" },
        { id: 6, user: { name: 'Jenna No', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 6', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$1000" },
    ];

    // if (clearUserDetails!==0){
    //     // delete item from original search results where item.id == clearuserdetails
    //     originalSearchResults.splice(originalSearchResults.findIndex(item => item.id === clearUserDetails), 1);
    //     // originalSearchResults.filter(item => item.id === clearUserDetails);
    // };

    const [searchResults, setSearchResults] = useState(originalSearchResults);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        if (searchQuery === '') {
            setSearchResults(originalSearchResults);
        } else {
            const filteredResults = originalSearchResults.filter(item =>
                item.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    // eslint-disable-next-line
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClick = (data) => {
        // setUserDetails(data);
        // isAuthorized();
        navigate('/adminLateFeeSystemUserDetails', {state: {data}});
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 w-full rounded py-2 px-4 mr-2"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
                >
                    Search
                </button>
            </div>
            <div className="mt-8 flex flex-col">
                {searchResults.map((result) => (
                    <div key={result.id} onClick={() => handleClick(result)} className="flex flex-row border border-gray-200 rounded p-4 m-2 cursor-pointer">
                        <div className='flex flex-row items-start w-0.66    '>
                            <img src={result.user.picture} alt="User" className="rounded-full mx-auto" />
                        </div>
                        <div className='flex flex-col justify-center ml-4 w-1/2'>
                            <p className="text-lg font-bold">{result.user.name}</p>
                            <p className="">{result.book.name}</p>
                        </div>
                        <div className='flex flex-col justify-center items-end text-lg font-bold text-red-500 mr-4 w-1/2'>
                            <p className="">{result.fee}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LateFeeSystemSearch;
