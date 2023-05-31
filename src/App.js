import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  
   useEffect(() => {
    const request_headers = new Headers();
    const api_key = "";
    request_headers.append("Authorization", `Bearer ${api_key}`);
    request_headers.append("Content-Type", "application/json");

    const request_options = {
      method: "GET",
      headers: request_headers,
    };

    fetch("https://countryapi.io/api/all", request_options)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);
  
  const data = Object.values(items);
  const search_parameters = Object.keys(Object.assign({}, ...data));

  function search(dados) {
    return items.filter(
      (item) =>
        search_parameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query)
        )
    );
  }
  
  if (error) {
    return <>{error.message}</>;
  } else if (!loaded) {
    return <>loading...</>;
  } else {
     return (
        <div className="wrapper">
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="sr-only">Search countries here</span>
            </label>
          </div>
          <ul className="card-grid">
            {data.map((item) => (
              <li key={item.alpha3Code}>
                <article className="card">
                  <div className="card-image">
                    <img src={item.flag.large} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <br></br>
                    <p>population: {item.population}</p>
                    <p>Region: {item.region}</p>
                    <p>Capital: {item.capital}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

export default App;
