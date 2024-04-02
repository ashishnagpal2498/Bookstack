// Author - Abhinav Acharya Tirumala Vinjamuri
import React, { useState, useEffect } from 'react';
import { localStorageUtil } from '../../../util/index'
// import { useNavigate } from 'react-router-dom';
import { getActiveLateFeeDetails, getPastLateFees } from '../../../services/LateFeeSystem'
import {disputeLateFeeCharge} from '../../../services/Notifications'

function LateFeeDetails() {
    // const navigate = useNavigate();
    // const [userDetails] = useState({ id: 2, user: { name: 'Jane Smith', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 2', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$150" });
    // Load Active Late Fee Details
    const [user_id] = useState(localStorageUtil.getItem('user').user_id);
    const [activeLateFeeDetails, setActiveLateFeeDetails] = useState({})
    const [activeLateFeeResponseMessage, setActiveLateFeeResponseMessage] = useState('')
    const [pastLateFeeDetails, setPastLateFeeDetails] = useState([])
    const [pastLateFeeResponseMessage, setPastLateFeeResponseMessage] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getActiveLateFeeDetails(user_id);
            // console.log(response);
            setActiveLateFeeDetails(response.active_late_fee);
            setActiveLateFeeResponseMessage(response.message);
        }
        fetchData();
    },
        [user_id])

    useEffect(() => {
        const fetchData = async () => {
            // Past Late Fee Details
            const pastLateFeeData = await getPastLateFees(user_id);
            // console.log(pastLateFeeData);
            setPastLateFeeDetails(pastLateFeeData.past_late_fees);
            setPastLateFeeResponseMessage(pastLateFeeData.message);
        };
        fetchData();
    },
        [user_id])

    const handleDisputeCharge = async() => {
        // Logic to clear fee
        const response = await disputeLateFeeCharge(user_id);
        // console.log(response);
        if (!response.status) {
            setModalContent(response.message);
            setShowModal(true);
            return;
        }
        setModalContent('Successfully notified the admin!');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='bg-aboutUsBrown h-full py-8'>
            <div className="container-sm md:container-xl mx-auto px-4 py-8 text-black bg-white rounded-lg">
                <div className="flex flex-col justify-between">
                    <div className='mb-4'>
                        <p className="text-3xl">Active Late Fee Details</p>
                    </div>
                    {
                        Object.keys(activeLateFeeDetails).length > 0 ? (
                            <div>
                                <div className='flex flex-col md:flex-row'>
                                    <img className="h-24 w-24 mb-4 md:w-40 md:h-40 md:mb-0" src={activeLateFeeDetails.book_picture} alt="Book" />
                                    <div className='mt-4 md:ml-4 flex flex-col justify-start items-start'>
                                        <div className="mb-3">
                                            <span className="text-gray-600">Book Name: </span>
                                            <span className="text-lg font-bold">{activeLateFeeDetails.book_name}</span>
                                        </div>
                                        <div className="mb-3">
                                            <span className="text-gray-600">Reserved Date: </span>
                                            <span className="text-lg font-bold">{activeLateFeeDetails.reserved_date}</span>
                                        </div>
                                        <div className="mb-3">
                                            <span className="text-gray-600">Due Date: </span>
                                            <span className="text-lg font-bold">{activeLateFeeDetails.due_date}</span>
                                        </div>
                                        <div className="mb-3">
                                            <span className="text-gray-600">Amount Due: </span>
                                            <span className="text-lg font-bold">${activeLateFeeDetails.amount_due}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button onClick={handleDisputeCharge} className="bg-navbarBrown hover:bg-hoverNavbarBrown text-white font-bold py-2 px-4 rounded">
                                        Dispute Charge
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className='text-center text-muted'>
                                {activeLateFeeResponseMessage}
                            </p>
                        )
                    }
                </div>

                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex items-end justify-end">
                                        <div onClick={() => closeModal()} className="cursor-pointer flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full hover:bg-hoverNavbarBrown bg-navbarBrown sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div>
                    <p className="text-3xl">Past Late Fee Details</p>
                    {Object.keys(pastLateFeeDetails).length > 0 ? (<div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Reserved Date
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Paid Date
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pastLateFeeDetails.map((item, i) => (
                                    <tr key={i}>
                                        <td className="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            <img src={item.image_url} alt="Book" className="h-10 w-10 rounded-full" />
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.book_name}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.reserved_date}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.due_date}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.paid_date}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            ${item.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>) : (<p className="text-center text-gray-600">{pastLateFeeResponseMessage}</p>)}
                </div>
            </div>
        </div>

    );
}

export default LateFeeDetails;