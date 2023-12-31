import { combineReducers } from 'redux';

//reducer for species search results
const searchResults = (state = [{data:[], searchTerms:{}}], action) => {
  switch (action.type) {
    case 'SET_SPECIES_RESPONSE':
      return [action.payload];
    default:
      return state;
  }
};

const userRegionBadgeResults = (state = [{count: 0}], action) => {
  switch (action.type) {
    case 'SET_BADGE_USER_REGION':
      return action.payload;
    default:
      return state;
  }
};

const treeBadgeResults = (state = [{count: 0}], action) => {
  switch (action.type) {
    case 'SET_BADGE_TREE':
      return action.payload;
    default:
      return state;
  }
};
  
const berriesBadgeResults = (state = [{count: 0}], action) => {
  switch (action.type) {
    case 'SET_BADGE_BERRIES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  searchResults,
  userRegionBadgeResults,
  treeBadgeResults,
  berriesBadgeResults,
});