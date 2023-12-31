import { combineReducers } from 'redux';

//reducer for new observation coordinates
const newObservationCoords = (state = [{lat: "", lng: ""}], action) => {
  switch (action.type) {
    case 'NEW_COORDINATES':
      return [action.payload];
    case 'RESET_COORDINATES':
      return [{lat: "", lng: ""}];
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

//reducer for observation to edit
const observationToEdit = (state = {}, action) => {
  switch (action.type) {
    case 'OBSERVATION_TO_EDIT':
      return action.payload;
    default:
      return state;
  }
};

//reducer for observation to highlight on ProfilePage component
const observationToHighlight = (state = {id: "", location: []}, action) => {
  switch (action.type) {
    case 'OBSERVATION_TO_HIGHLIGHT':
      return action.payload;
    case 'RESET_HIGHLIGHT':
      return {id: "", location: []};
    default:
      return state;
  }
};
  

export default combineReducers({
  newObservationCoords,
  userObservationList,
  observationToEdit,
  observationToHighlight,
});