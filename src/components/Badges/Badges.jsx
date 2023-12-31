import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function Badges() {

  const user = useSelector((store) => store.user);
  const userRegion = useSelector(store => store.userdata.userRegion[0])
  const regionBadgeSpecies = useSelector(store => store.search.userRegionBadgeResults)
  const berryBadgeSpecies = useSelector(store => store.search.berriesBadgeResults)
  const treeBadgeSpecies = useSelector(store => store.search.treeBadgeResults)
  const observationList = useSelector(store => store.observation.userObservationList);


  const dispatch = useDispatch();

  //fetches list of unique species observed in user's region
  useEffect(() => {
    console.log('fetching list of unique species from regional observations');
    // dispatch an action to get list
    dispatch({type: 'BADGE_USER_REGION', payload: { region: userRegion.id, user_id: user.id}})
    //berries
    dispatch({type: 'BADGE_TREES', payload: { user_id: user.id}})
    //trees
    dispatch({type: 'BADGE_BERRIES', payload: { user_id: user.id}})

  }, [observationList]);


  return (
    <div className="box-item2">
    <center><p><b>Badges:</b></p></center>
    <div className="box-grid" style={{marginTop:'0px'}}>
      <div className="box-item2">
        <img 
          id="1-thing"
          className={regionBadgeSpecies[0].count <1 ? "unearned" : ""}
          alt={user.icon}
          width={"75px"}
          height={"75px"}
          src={`Site_SVG/badges/purple.svg`}
          title={regionBadgeSpecies[0].count <1 ? "Earn the badge by logging a find!" : "Way to go! You logged a find!"}
        /> 
        <p htmlFor='1-thing'>Official Forager</p>
      </div>
      <div className="box-item2">
        <img 
          className={regionBadgeSpecies[0].count <10 ? "unearned" : ""}
          alt={user.icon}
          width={"75px"}
          height={"75px"}
          src={`Site_SVG/badges/red.svg`}
          title={regionBadgeSpecies[0].count <10 ? `Next goal: find 10 species! You've found ${regionBadgeSpecies[0].count}` : "WOWZA! 10 species found!"}
        />
        <p htmlFor='10-things'>10 Species</p>
      </div>
      <div className="box-item2">
        <img 
          id="berries"
          className={berryBadgeSpecies[0].count <5 ? "unearned" : ""}
          alt={user.icon}
          width={"75px"}
          height={"75px"}
          src={`Site_SVG/badges/berry.svg`}
          title={berryBadgeSpecies[0].count <5 ? `Log 5 berries! You've found ${berryBadgeSpecies[0].count} berry species.` : "Berry Berry Berry"}
        />
        <p htmlFor='berries'>Berry Finder</p>
      </div>
      <div className="box-item2">
        <img 
          id="trees"
          className={treeBadgeSpecies[0].count <10 ? "unearned" : ""}
          alt={user.icon}
          width={"75px"}
          height={"75px"}
          src={`Site_SVG/badges/tree.svg`}
          title={treeBadgeSpecies[0].count <10 ? `Find 10 trees! You've found ${treeBadgeSpecies[0].count} tree species.` : "Tree Forager Status, hell yeah!"}
        />
        <p htmlFor='trees'>Tree Finder</p>
      </div>
    </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Badges;
