import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SearchRegion () {

    const regionList = useSelector((store) => store.plants.regionList);
    const [searchRegion, setSearchRegion] = useState('');
    
    const regionPlants = useSelector((store) => store.search.regionSearchResponse)
    
    const dispatch = useDispatch();
    const history = useHistory();

    //fetches regions for form selector
    useEffect(() => {
        console.log('fetching region list');
        dispatch({type:'FETCH_REGIONS'})
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch({ type:'SEARCH_REGION' , payload: {searchTerm: searchRegion} });
        history.push('/results/region')
    }

    return(
        
        <div>
            {JSON.stringify(regionPlants)}
            <form onSubmit={handleSearch}>
                <label htmlFor="regions">Select Region:</label>
                <select
                id="regions"
                    value={searchRegion}
                    onChange={(event) => setSearchRegion(event.target.value)}
                    required
                >
                    {regionList.map((region) => {
                        return <option key={region.id} value={region.id}>{region.name}</option>;
                    })}
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchRegion;