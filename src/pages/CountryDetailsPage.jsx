import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetailsPage(props) {
  const [countryDetails, setcountryDetails] = useState(null);
  const countryId = props.match.params.countryId;

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        setcountryDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching country details', error);
      });
  }, [countryId]);

  return (
    <div>
      <h2>Country Details</h2>
      {countryDetails ? (
        <div>
          <h3>{countryDetails.name.common}</h3>
          <p>Capital: {countryDetails.capital}</p>
          <p>Population: {countryDetails.population} </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryDetailsPage;
