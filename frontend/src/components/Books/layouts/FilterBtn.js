// Ashish Nagpal
import React from 'react'

const FilterBtn = ({ sideBtn, toggleFilterMenu }) => {
    return (
        <div id='filter' className="filter-bar-dropdown" onClick={toggleFilterMenu}>
            <div className={sideBtn ? "filter-bar-dropdown-btn filter-options-btn" : "filter-bar-dropdown-btn"} >
                <span className='filter-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ><path d="M2 7h.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2H9.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2zm4-3a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm24 11h-.142a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h20.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-4 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4 7H19.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h10.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-14 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"></path></svg> </span>
                <span>Filters</span>
                {sideBtn &&
                    <span className='close-sidebar-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /> <path d="M9 3v18" /> <path d="m16 15-3-3 3-3" /> </svg></span>
                }
            </div>
        </div>
    )
}

export default FilterBtn