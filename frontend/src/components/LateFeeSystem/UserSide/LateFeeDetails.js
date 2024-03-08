import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LateFeeDetails() {
    const navigate = useNavigate();
    const [userDetails] = useState({ id: 2, user: { name: 'Jane Smith', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 2', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$150" });
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleRemindUser = () => {
        // Logic to remind user
        setModalContent('User successfully notified!');
        setShowModal(true);

    };

    const handleClearFee = () => {
        // Logic to clear fee
        setModalContent('Successfully cleared!');
        setShowModal(true);
        // setClearUserDetails(userDetails.id);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/adminLateFeeSystemSearch');
    };

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <img src={userDetails.user.picture} alt="Person" className="rounded-full h-24 w-24 mb-2" />
                    <p className="text-lg font-bold mb-1">{userDetails.user.name}</p>
                    <img src={"https://source.unsplash.com/random/200x200/?book,title,page"} alt="Book" className="mb-2" />
                    <p className="text-lg font-bold mb-1">{userDetails.book.name}</p>
                </div>
                <div className="ml-8 pt-24">
                    <div className="mb-4">
                        <p className="text-gray-600">Reserved Date:</p>
                        <p className="text-lg font-bold">{userDetails.book.reservedDate}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600">Due Date:</p>
                        <p className="text-lg font-bold">{userDetails.book.dueDate}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600">Amount Due:</p>
                        <p className="text-lg font-bold text-red-600">{userDetails.fee}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button onClick={handleRemindUser} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-4">
                    Remind User
                </button>
                <button onClick={handleClearFee} className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Clear Fee
                </button>
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex items-end justify-end">
                                    <div onClick={() => closeModal()} className="cursor-pointer flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-lg text-center mb-8 leading-6 font-medium text-gray-900">{modalContent}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default LateFeeDetails;