# CSCI 5709 Grp-13

Group project for 5709 Advanced Web services.

# Book Stack - v2

This version showcases various UI pages that provide contextual information about the application `Book Stack` and its purpose.

## Authors

1. Member 1

   - [Abhinav Acharya Tirumala Vinjamuri](ab806657@dal.ca)
   - Branch Name:- [Abhinav_Acharya](https://git.cs.dal.ca/anagpal/csci-5709-grp-13/-/tree/Abhinav_Acharya?ref_type=heads)

## Description

This is the directory that contains a stable deployement version of the application. The front-end is deployed on Netlify which we configured by adding a remote that pushes the code to GitHub. The backend is deployed on Render using the same process. We have employed MongoDB for the database.

## Links

1. Gitlab Repo: https://git.cs.dal.ca/anagpal/csci-5709-grp-13/-/tree/main?ref_type=heads
2. Frontend Deployment Link - Netlify: https://bookstack-csci-group-13.netlify.app/
3. Backend Deployment Link - Render: https://bookstack-grp13.onrender.com

## Late Fee System

Late Fee System is essentially supposed to penalize users who borrowed books from the library, but failed to return them before the due date. We have defined 2 tasks in this feature which will be talked about in the section below: Late fees can deny users from borrowing/ reserving books until they are cleared. The tasks for this feature involve functionalities for both readers and administrators. Readers are required to view the costs associated with each book that has not been returned, and raise a dispute if they find a charge unnacceptable. On the other hand, administrators have the responsibility to identify users who have incurred late fees. Once it has been confirmed that the readers have cleared these fees, the administrators should be able to clear them from the system, or notify them if they haven't cleared the fee yet. These tasks ensure a smooth operation of the book rental service and maintain a fair system for all users.

To understand the task flow of this feature better: 

#### Admin Workflow:

  1. **Admin logs in**: The admin starts by logging into the system.
  2. **Navigate to Reservations**: The admin navigates to the reservations section of the system.
  3. **Add Late Fee**: If a user has not returned a book in time, the admin can click to add a late fee to that specific user.
  4. **Navigate to Late Fee System Page**: The admin then navigates to the Late Fee System page.
  5. **View Late Fee Users**: On this page, the admin can see the users to whom they have applied late fees.
  6. **Search Late Fee Users**: The admin has the ability to search from a list of late fee users.
  7. **Select a Late Fee User**: The admin can select a user from the list of late fee users.
  8. **Notify User**: Once a user is selected, the admin can notify them to clear their late fee.
  9. **Clear Late Fee**: Finally, the admin has the ability to clear the applied late fee, which removes the user from the list.

#### Reader Workflow:
  1. **Reader logs in**: The reader starts by logging into the system.
  2. **Access Late Fee System Page**: The reader then accesses the Late Fee System page.
  3. **View Details**: On this page, the reader can see their details such as active late fee and past late fees.

## Notifications

Notifications are essential for reminding users or admins about various purposes. Admins can use the service to remind users regarding their uncleared late fees, update in availability of a book, etc., whereas the users can use the service to notify the admin if they have a dispute in their late fee, send an invoice/ confirmation of a successful book reservation. 

## Built With

1. [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
2. [npm](https://docs.npmjs.com//) - Dependency Management
3. [Tailwind CSS](https://tailwindcss.com/) - Styling Framework
4. [NodeJS](https://nodejs.org/en) - Javascript runtime environment for building fast and scalable web applications
5. [ExpressJS](https://expressjs.com/) - Node framework for building REST apis

## Sources Used

### frontend/tailwind.config.js

_Lines 1 - 26_

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
  theme: {
    extend: {
      colors: {
        customBackground: 'rgb(244, 247, 245)',
        card: 'rgb(77, 99, 86)',
        carrara: 'rgb(241,242,227)',
        navbar: 'rgb(128, 124, 149)',
        darkSkin: 'rgb(130, 120, 110)',
        text: 'rgb(31, 21, 32)',
        highlight: 'rgb(56, 110, 128)',
        navbarBrown: 'rgba(192, 138, 95, 255)',
        aboutUsBrown: 'rgba(252, 232, 199, 1)',
        hoverNavbarBrown: 'rgb(160, 107, 64)'
      },
    },
  }
}
```

This code above was created by adapting the code in [Configuration - A guide to configuring and customizing your Tailwind installation.](https://tailwindcss.com/docs/configuration) as shown below:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- The above code is the default configuration that is provided by Tailwind CSS that provides certain styles and configurations to components and elements. Since nothing is defined yet in the configuration file, everything is defaulted to the default configuration that can be found in [default configuration](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js).
- We modifed it so that we can define some custom colors for the application's background, and components. This is important as it makes it easier to make the entire application look and feel consistent throughout even though different members might work on different parts of the application.

### frontend/src/components/LateFeeSystem/AdminSide/LateFeeSystemSearch.js

_Lines 45-80_

```
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
```

- The above code is the is created by using Tailwind CSS classes according to the necessity and use case. I had not used any pre-built templates/ layouts to achieve the UI. Instead, I used tailwind class names and custom styling to achieve the look that I had proposed in wireframes and semi-functional prototypes.
- The code also showcases the use of ternary operators to display an error message (User feedback) if any error occurs while fetching the data.
- The code is also mobile responsive which was achieved through tailwind css breakpoints such as **md:, sm:** which allows us to manipulate styling based on certain device widths.

_Lines 7 - 42_

```
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
```

- I have setup state variables to achieve the dynamic update of UI. Furthermore, creating multiple state variables for multiple parameters of the request's response made the code more decoupled and easier to manage.
- The use of useEffect for search instead of a button makes the search functionality rapidly fast.

### frontend/src/components/LateFeeSystem/AdminSide/LateFeeSytemUserDetails.js

_Lines 8 - 88_

```
    const navigate = useNavigate();
    const location = useLocation();
    const { user_id } = location.state;
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [userDetails, setUserDetails] = useState({})
    const [userDetailsResponseMessage, setUserDetailsResponseMessage] = useState('')
    const [activeLateFeeDetails, setActiveLateFeeDetails] = useState({})
    const [activeLateFeeResponseMessage, setActiveLateFeeResponseMessage] = useState('')
    const [pastLateFeeDetails, setPastLateFeeDetails] = useState([])
    const [pastLateFeeResponseMessage, setPastLateFeeResponseMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            // User Details
            const userData = await getUserDetails(user_id);
            // console.log(userData);
            setUserDetails(userData.user);
            setUserDetailsResponseMessage(userData.message);
        };
        fetchData();
    },
        [user_id])

    useEffect(() => {
        const fetchData = async () => {
            // Active Late Fee Details
            const activeLateFeeData = await getActiveLateFeeDetails(user_id);
            // console.log(activeLateFeeData);
            setActiveLateFeeDetails(activeLateFeeData.active_late_fee);
            setActiveLateFeeResponseMessage(activeLateFeeData.message);
        };
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


    // const userDetails = { id: 2, user: { name: 'Jane Smith', email: 'ab@ab.ab', phone: '+17828224556', picture: 'https://source.unsplash.com/random/100x100/?person' }, book: { name: 'Book 2', reservedDate: "25-01-2024", dueDate: "02-02-2024" }, fee: "$150" }

    const handleRemindUser = async () => {
        // Logic to remind user
        const response = await remindUserLateFee(user_id);
        // console.log(response);
        if (!response?.status) {
            setModalContent(response?.message);
            setShowModal(true);
        }
        setModalContent('User successfully notified!');
        setShowModal(true);

    };

    const handleClearFee = async () => {
        // Logic to clear fee
        const response = await clearActiveLateFee(user_id);
        if (!response?.status) {
            setModalContent(response?.message);
            setShowModal(true);
            return;
        }
        setModalContent('Successfully cleared!');
        setShowModal(true);

    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/latefee/');
    };

```

- The use of 3 **useEffects** for 3 APIs instead of 1 makes different sections of the page load almost synchronously. Furthermore, it doesn't hog the request with 3 responses to await for.
- The use of **?** symbol while accessing parameters of an object allows of error handling incase of a missing key.

_Lines 169 - 190_

```
<div className="fixed z-100 inset-0 overflow-y-auto">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex items-end justify-end">
                      <div onClick={() => closeModal()} className="cursor-pointer flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-navbarBrown hover:bg-hoverNavbarBrown sm:mx-0 sm:h-10 sm:w-10">
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
```
- This code is referenced and adapted from [Tailwind CSS Modal - Flowbite](https://flowbite.com/docs/components/modal/). I had changed the entire look and feel of the modal according to the needs of my feature's UI.
The original code is shown below:
```

<button data-modal-target="popup-modal" data-modal-toggle="popup-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
Toggle modal
</button>

<div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
        </div>
    </div>
</div>
```
- The original code has many unnecessary components (buttons, text) that I had removed as they were not useful to my usecase. I also made it mobile responsive by setting breakpoint styling.

_Lines 196 - 243_
```
                        <table class="w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col" class="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" class="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Reserved Date
                                    </th>
                                    <th scope="col" class="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th scope="col" class="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Paid Date
                                    </th>
                                    <th scope="col" class="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {pastLateFeeDetails.map((item, i) => (
                                    <tr key={i}>
                                        <td class="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            <img src={item.image_url} alt="Book" class="h-10 w-10 rounded-full" />
                                        </td>
                                        <td class="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.book_name}
                                        </td>
                                        <td class="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.reserved_date}
                                        </td>
                                        <td class="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.due_date}
                                        </td>
                                        <td class="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            {item.paid_date}
                                        </td>
                                        <td class="px-3 md:px-6 py-3 md:whitespace-nowrap">
                                            ${item.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
```
- The code above is for a table that I referenced and extended from [Tailwind CSS Table - Flowbite](https://flowbite.com/docs/components/tables/). The original code is as shown below:

```


<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>

```
- While the original code had defined the structure that I needed, the data, and the size of the table were not what I wanted. I had added more columns according to my data, defined some custom styling based on the type of the data that I was handling, and also made it mobile responsive by setting breakpoint styling.

### frontend/src/services/LateFeeSystem & Notifications
- The Javascript files located in these folders contain several functions that interact with a backend server to manage the API calls for both of my features (**Late Fee System** and **Notifications**).
- These functions use the fetch API to make HTTP requests to various endpoints on the server.
- Here’s a brief description of each function:

  1. **createLateFee(user_id, book_id, reserved_date):** This function creates a late fee for a specific user and book. It sends a POST request to the /late-fees/create endpoint with the user ID, book ID, and reserved date in the request body.
  2. **checkActiveLateFee(user_id):** This function checks if a specific user has any active late fees. It sends a GET request to the /late-fees/check-restriction/{user_id} endpoint.
  3. **getActiveLateFeesUsers():** This function retrieves a list of users who have active late fees. It sends a GET request to the /late-fees/active-users endpoint.
  4. **getUserDetails(user_id):** This function retrieves the details of a specific user. It sends a GET request to the /late-fees/user-details/{user_id} endpoint.
  5. **getActiveLateFeeDetails(user_id):** This function retrieves the details of the active late fees for a specific user. It sends a GET request to the /late-fees/active-fee-details/{user_id} endpoint.
  6. **getPastLateFees(user_id):** This function retrieves the details of past late fees for a specific user. It sends a GET request to the /late-fees/past-fee-details/{user_id} endpoint.
  7. **clearActiveLateFee(user_id):** This function clears the active late fee for a specific user. It sends a POST request to the /late-fees/clear-fee endpoint with the user ID in the request body.
  8. **remindUserLateFee(user_id):** This function sends a late fee reminder to a specific user. It sends a POST request to the /notify/late-fee-reminder-user/{user_id} endpoint.
  9. **disputeLateFeeCharge(user_id):** This function allows a specific user to dispute a late fee charge. It sends a POST request to the /notify/late-fee-dispute-charge/{user_id} endpoint.
  
- Each function uses the **async/await** syntax to handle the asynchronous nature of the fetch API, and they all return the response data as a JavaScript object. If an error occurs during the fetch operation, the error is logged to the console and the function returns null.
- Using this structure makes it easier to call the APIs inside the components, as we don't need to manage all the input/ response/ await validations again.

### frontend/src/util/config.js

```
export const backend_url = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:8080';
```

- This line of code makes it easier to develop and test the feature by using specific endpoints based on an environment variable.

### frontend/src/util/localStorage.js

```
// Author - Abhinav Acharya Tirumala Vinjamuri
// Util function for Local Storage so that we don't need to worry about converting it into a string and back to object...

export const localStorageUtil = {
    setItem: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }, 
    
    getItem: function (key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    removeItem: function (key) {
        localStorage.removeItem(key);
    },

    clear: function () {
        localStorage.clear();
    }

}
```

- This line of code makes it easier to use data set in local storage session of the user's browser without handling it again and again.

### frontend/src/util/authenticationService.js

```
// Author - Abhinav Acharya Tirumala Vinjamuri
import { localStorageUtil } from "./localStorage";

export const isAuthenticated = () => {
    if (localStorageUtil.getItem('user')) {
        return true;
    }
    return false;
}

export const isAdmin = () => {
    if (!localStorageUtil.getItem('user')) {
        return false;
    }
    if (localStorageUtil.getItem('user')?.role === 'admin') {
        return true;
    }
    return false;
}
```

- This line of code makes it easier to check if a user is currently logged in, or even check their role to verify if they're an admin. (for route guarding certain endpoints).

### frontend/src/App.js

_Lines 47 - 48_

```
<Route path="/latefee" element={isAuthenticated() ? (isAdmin() ? <LateFeeSystemSearch /> : <LateFeeDetails />) : <Navigate to="/login" /*replace="true"*/ />} />
<Route path="/latefee/details" element={(isAuthenticated() && isAdmin()) ? <LateFeeSystemUserDetails /> : <Navigate to="/login" /*replace="true"*/ />} />
```

- The first line checks if the user is authenticated (as determined by the **isAuthenticated()** function), it checks if the user is an admin (using the **isAdmin()** function). If the user is an admin, it renders the **LateFeeSystemSearch** component; otherwise, it renders the **LateFeeDetails** component. If the user is not authenticated, it redirects the user to the **/login** page.
- The second line checks if the user is authenticated and is an admin, if so, it renders the **LateFeeSystemUserDetails** component. If the user is not authenticated or is not an admin, it redirects the user to the **/login** page.

### backend/models/

- This folder is created to define the schema of the collections that we have defined / proposed during our project proposal. 
- The schema of each collection is developed by referencing the data contracts that can be found at **./data-contracts/**.

### backend/controllers/lateFeeSystem.js

- This JavaScript file is a controller for managing late fees of our book rental system. It exports several functions that interact with a MongoDB database using Mongoose schemas and the native MongoDB driver’s ObjectId function. Here’s a brief description of the exported functions from the file:

  1. **createLateFee(req, res):** creates a new late fee for a user. The function validates the user and book details, checks if a late fee already exists for the user, and then either updates the existing late fee or creates a new one. It calculates the due amount as 50% of the book price. If an error occurs, it logs the error and sends a 500 status code response.
  2. **checkActiveLateFee(req, res)**: checks if a user has any active late fees. The function validates the user details, checks if a late fee exists for the user, and then checks if there are any unpaid late fees. If there are unpaid late fees, it returns true; otherwise, it returns false. If an error occurs, it logs the error and sends a 500 status code response.
  3. **getActiveLateFeesUsers(req, res)**: fetches a list of all users who have active late fees. The function retrieves all documents with unpaid late fees, iterates over them, and for each document, it fetches the user and book details, constructs a user dictionary, and adds it to a list. If there are no users with active late fees, it returns a message indicating so. 
  4. **getUserDetails(req, res)**: Fetches user details to display on the admin late fee details page. It validates the user details and returns the user’s picture, name, email, and phone. If an error occurs, it sends a 500 status code response.
  5. **getActiveLateFeeDetails(req, res)**: Fetches active late fee details to display on the admin and user late fee details page. It validates the user and late fee details, and returns the book picture, book name, reserved date, due date, and amount due. If an error occurs, it sends a 500 status code response.
  6. **getPastLateFees(req, res)**: Fetches past late fees to display on the admin and user late fee details page. It validates the user and late fee details, and returns the book picture, book name, paid date, and amount paid. If an error occurs, it sends a 500 status code response.
  7. **clearActiveLateFee(req, res)**: Clears active late fees for a user. It validates the user and late fee details, and sets the paid status to true and adds a paid date. If an error occurs, it sends a 500 status code response.  

### backend/controllers/notifications.js
- This javascript file is a controller for managing the notifications of our book rental app. Here's a brief description of the exported functions of the file:
  1. **remindUserLateFee(req, res)**: Sends a late fee reminder to a user. It validates the user details, constructs an email content, and sends an email to the user. If an error occurs, it sends a 500 status code response.
  2. **disputeLateFeeCharge(req, res)**: Notifies the admin of uncleared late fees. It validates the user and admin details, constructs an email content, and sends an email to the admin. If an error occurs, it sends a 500 status code response.
- For sending emails, I have 2 more utilities setup that I'm using inside this controller file. I have created an HTML template that is used to send as the email's body. I am initiating the transport of the email notifications using node's SMTP utility called [nodemailer](https://www.nodemailer.com/). More on that later. 

### backend/routes/lateFeeSystem.js & Notifications.js

- Both of these files are structured to define a set of routes for handling different API requests in an Express.js application.

### backend/util/mailService.js

_Lines 1 - 23_
```
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  }
});

module.exports = transporter;

```
- This function sends an email using a pre-configured transporter object. It takes the sender’s email address, recipient’s email address, email subject, HTML content for the email body, and a callback function as parameters. The function constructs the email options and sends the email using the transporter.sendMail() method. 
- This function is referred and adapted from [Nodemailer](https://www.nodemailer.com/), and changed to fit the MVC architecture that I've setup in the project. The original code is as shown below:
```
let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});
transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Message',
    text: 'I hope this message gets delivered!'
}, (err, info) => {
    console.log(info.envelope);
    console.log(info.messageId);
});
``` 
- To use it in different places without rewriting the code, I decoupled the code to declare them as constants and exported them to use in specific places.

### backend/util/transporter.js

_Lines 1 - 14_
```
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  }
});

module.exports = transporter;

```
- This file exports a transporter object, which is configured to send emails using Gmail’s SMTP service. The transporter is created using the nodemailer.createTransport() method and configured with Gmail as the service, and the email and password of the sender, which are fetched from environment variables. Reference - [Nodemailer](https://www.nodemailer.com/).

### Icons

- The icons that we used in all pages were taken from [Freepik](https://www.freepik.com/).
- Freepik provides free images for personal and commercial use that we can edit and use in our application.
- We changed the color scheme of the images to match the rest of the application.


## Acknowledgments
1. **Node.js Community:** We are grateful to the Node.js community for their extensive resources and tutorials. The asynchronous nature of Node.js has taught us to think differently about programming logic and structure.
2. **Express.js Framework:** Express.js has been instrumental in understanding how to set up a server, handle requests, and build APIs. The simplicity and flexibility of Express.js have made backend development more approachable.
3. **Tailwind CSS:** Tailwind CSS has revolutionized my approach to styling web pages. Its utility-first philosophy encourages component composition and promotes consistency across the project. It streamlined the development as I did not needed to develop separate styling for achieving mobile responsive from scratch.
4. **Coding Community:** The coding community’s dedication to sharing knowledge through articles, blogs, and videos has been invaluable. Their insights have helped us improve our skills and contribute more effectively to our projects.
5. **React Ecosystem:** Our experience with React has not only enhanced our technical skills but also shaped our problem-solving approach. The React documentation and community have provided clear explanations and examples that have greatly facilitated our understanding of complex concepts. The concept of state, props, and hooks in React has deepened our understanding of data flow within an application and underscored the importance of effective state management.

## References

1. “Rapidly build modern websites without ever leaving your HTML,” Tailwindcss.com. [Online]. Available: https://tailwindcss.com/. [Accessed: 02-Feb-2024].
2. "FreePik," Frepik. [Online]. Available: https://www.freepik.com/. [Accessed: 20-Feb-2024]"
3. "Nodemailer," Nodemailer. [Online]. Available: https://www.nodemailer.com/. [Accessed: 10-Mar-2024]"
