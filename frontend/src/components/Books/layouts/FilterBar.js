import React, { useState } from 'react'
import Search from './Search'
import FilterBtn from './FilterBtn';


export const FilterBar = ({books, filterBooks, openFilterMenu, toggleFilterMenu, selectedFilters, handleFilterCheckbox}) => {

    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState("Recommended");

    const sortOptions = ["Recommended", "Name", "Popularity"]

    const onSearchChange = (searchValue) => {
        
        let filterData = JSON.parse(JSON.stringify(books)); 
            filterData = filterData.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase()))
       filterBooks(filterData)
    };
    return (
        <div className="filter-bar">
            {!openFilterMenu && <FilterBtn sideBtn={false} toggleFilterMenu={toggleFilterMenu} />}
            <Search onSearchChange={onSearchChange} />
            <div className="filter-bar-dropdown">
                <div className="filter-bar-dropdown-btn" onClick={(e) => { setIsActive(!isActive); }} >
                    <span>{selected}</span>
                    <label>Sort By</label>
                </div>
                {isActive &&
                    <ul className="dropdown-content">
                        {
                            sortOptions.map((item, index) => <li key={index}
                                onClick={(e) => {
                                    setIsSelected(e.target.textContent);
                                    setIsActive(!isActive);
                                }}
                                className={`item ${selected === item && 'selected'}`}
                            >{item}</li>)
                        }
                    </ul>
                }
            </div>
            <ul className='active-filters'>
                {Object.entries(selectedFilters).map(([filterKey, filteredVal]) => {
                console.log(`${filterKey} + ${filteredVal}`); 
                return filteredVal.length>0 && 
                filteredVal.map((appliedFilter) => 
                <li key={filterKey+"-"+appliedFilter} onClick={() => {handleFilterCheckbox(filterKey,appliedFilter,true); console.log('remove Filter clicked  -> ' + filterKey + filteredVal)}} className='filter-bar-dropdown-btn'>
                <span className='filter-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ><path d="M2 7h.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2H9.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2zm4-3a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm24 11h-.142a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h20.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-4 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4 7H19.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h10.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-14 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"></path></svg> </span>
                <span>{filterKey + ":" + appliedFilter}</span>
                <span className='filter-remove-icon' >&#x2715;</span>
                </li>
                )
                })}
            </ul>
        </div>
    )
}
