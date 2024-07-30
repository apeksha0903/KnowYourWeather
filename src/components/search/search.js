import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoAPIoptions, geoAPIurl } from "../../api";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloud } from '@fortawesome/free-solid-svg-icons';
import './search.css'; 
const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState('');

    const loadOptions = (inputValue) => {
        return fetch(`${geoAPIurl}/cities?minPopulation>10000000&namePrefix=${inputValue}`, geoAPIoptions)
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.country}`,
                        };
                    })
                };
            })
            .catch(err => {
                console.log(err);
                return { options: [] }; // Return an empty options array in case of error
            });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <div className="SearchComponent">
        <h2>My Weather Forecast</h2>
        {/* <FontAwesomeIcon className="cloudIcon" icon={faCloud}/> */}
        <AsyncPaginate className="Input"
            placeholder="Search for your city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
        </div>
    );
};

export default Search;
