const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET search by species name
router.get('/species/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log('Fetching species info for search')
    if(req.isAuthenticated()) {
      let queryText = `SELECT s.*, o.user_id FROM "species" s
                  LEFT JOIN "observations" o
                  ON o.species_id = s.id
                  WHERE "scientific_name"  ILIKE '%' || $1 || '%'
                  OR "common_name"  ILIKE '%' || $1 || '%'
                  ORDER BY "common_name" ASC;`;
    pool.query(queryText, [searchTerm])
    .then(result => {
      res.send(result.rows);
      console.log(result.rows)
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET

//GET search by growth type
router.get('/type/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log('Fetching species info by growth type')
    if(req.isAuthenticated()) {
    let queryText = `SELECT s.*, o.user_id FROM "species" s
                    LEFT JOIN "observations" o
                    ON o.species_id = s.id 
                    WHERE "growth_type"  LIKE '%' || $1 || '%'
                    ORDER BY "common_name" ASC;`;
    pool.query(queryText, [searchTerm])
    // pool.query(queryText)

    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET


//GET search by region
router.get('/region/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  console.log('Fetching species info by region')
    if(req.isAuthenticated()) {
    let queryText = `SELECT DISTINCT r.name, s.*, o.user_id FROM species s
                  FULL JOIN observations o
                  ON s.id = o.species_id
                  JOIN species_state x
                  ON s.id = x.species_id
                  JOIN states y
                  ON x.state_id = y.id
                  JOIN regions r
                  ON y.region_id = r.id
                  WHERE r.id = $1
                  ORDER BY "common_name" ASC`;
    pool.query(queryText, [searchTerm])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error fetching species`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET

module.exports = router;
