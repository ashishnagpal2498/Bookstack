[
    {
        id: 1,
        book_id: 1,
        holds: [
            // if empty, fetch reservation_date from reservations.js and add 1 week. 
            // Else take latest book_available_date from this list and add 1 week.
            {
                user_id: 1,
                book_available_date: "2021-01-08"
            },
            {
                user_id: 1,
                book_available_date: "2021-01-15"
            },
        ]
    },
    {
        id: 1,
        book_id: 2,
        holds: [
            {
                user_id: 1,
                book_available_date: "2021-01-08"
            },
            {
                user_id: 1,
                book_available_date: "2021-01-08"
            },
        ]
    },
    
]