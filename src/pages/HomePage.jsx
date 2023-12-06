import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetching data from the API:
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then(response => {
        // Set retrieved data to the state:
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that useEffect runs only once on component mount

  return (
    <div>
      <h1 className='homeTitle'>WikiCountries: Your Guide to the World</h1>
      <ul className='country-list'>
        {countries.map(country => (
          <li className='country-names' key={country.alpha3Code}>
            <Link to={`/country/${country.alpha3Code}`}>
              <img
                className='country-icons'
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt={`${country.name.common} flag`}
              />
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
