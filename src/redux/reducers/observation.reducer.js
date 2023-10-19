import { combineReducers } from 'redux';

//reducer for new observation coordinates
const newObservationCoords = (state = [], action) => {
    switch (action.type) {
      case 'NEW_COORDINATES':
        return [action.payload];
      case 'RESET_COORDINATES':
        return [];
      default:
        return state;
    }
  };
  
  
  //reducer for users observations
  const userObservationList = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_OBSERVATIONS':
        return action.payload;
      default:
        return state;
    }
  };
  
  //reducer for wikipedia info
  const wikiSpeciesData = (state = [], action) => {
    switch (action.type) {
      case 'SET_WIKI_DATA':
        return [action.payload];
      default:
        return state;
    }
  };

  export default combineReducers({
    newObservationCoords,
    userObservationList,
    wikiSpeciesData
  });