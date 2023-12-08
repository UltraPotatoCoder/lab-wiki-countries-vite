import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CountryDetailsPage() {
  const [countryDetails, setcountryDetails] = useState(null);
  const { countryId } = useParams();

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
          <p>Area: {countryDetails.area}m^2</p>
          <p>Borders:</p>
          <ul className='border-list'>
            {countryDetails.borders.map(border => (
              <li key={border}>
                <Link to={`/country/${border}`}>{border}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryDetailsPage;
