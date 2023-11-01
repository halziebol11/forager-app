import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//MUI components
import ListItem from '@mui/material/ListItem';

//format date for selector
function alterDate (string) {
  return string.substr(0,10)
}

function ObsItemMap( { observation, i } ) {

  //controls option buttons for observations
  let [displayToggle, setDisplayToggle] = useState(true);

  const user = useSelector((store) => store.user);


  const history = useHistory();
  const dispatch = useDispatch();
 
  const handleEdit = () => {
    console.log("observation:", observation)
    dispatch({type: 'OBSERVATION_TO_EDIT', payload: observation})
    history.push(`/editObservation/${observation.id}`);
  }

  const handleDelete = () => {
    //send user_id with payload
    console.log('observation id:', observation.id)
    dispatch({type:'DELETE_OBSERVATION', payload:{id: observation.id, user_id: user.id}})//image: observation.photo for delete route

  }

  return (
    <ListItem key={observation.id}>
      <p>Observation # {i+1}</p>       
      {(displayToggle == true) ? 
      <img 
        alt="plus"
          width={"20px"}
          height={"20px"}
          src={`Site_SVG/plus.svg`}
          onClick={() => setDisplayToggle(false)}
        />
      : 
      <div>
        <img 
          alt="minus"
          width={"20px"}
          height={"20px"}
          src={`Site_SVG/minus.svg`}
          onClick={() => setDisplayToggle(true)}
        />
        <img 
           alt="edit"
            width={"20px"}
            height={"20px"}
            src={`Site_SVG/edit.svg`}
            onClick={handleEdit}
          />
        <img 
          alt="delete"
          width={"20px"}
          height={"20px"}
          src={`Site_SVG/delete.svg`}
          onClick={handleDelete}
        />
      </div>
      }
      <p>Date: {alterDate(observation.date_observed)}</p>
      <p><i>{observation.scientific_name}</i></p>
      <img 
        alt="info"
        width={"20px"}
        height={"20px"}
        src={`Site_SVG/info.svg`}
        onClick={() => history.push(`/info/${observation.id}`)}
      />
      <p>Notes: {observation.notes !== "" ? observation.notes : 'N/A'}</p>
      { (observation.photo !== "") &&
        <img 
          alt={`photo_obs_id${observation.id}`}
          width={"40px"}
          height={"80px"}
          src={observation.photo}
        />
      }
     
       <img 
          alt="marker"
          width="20px"
          height="20px"
          src={`Site_SVG/marker.svg`}
          onClick={() => dispatch({type:'OBSERVATION_TO_HIGHLIGHT', payload: { id: observation.id, location: observation.location}})}
        />
    </ListItem>
  );
}

export default ObsItemMap;
