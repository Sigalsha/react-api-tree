import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const useNPSApi = () => {
  const [data, setData] = useState({ data: [] });
  const [query, setQuery] = useState("");
  const [isLoading, setLoadingStat] = useState(false);
  const [isError, setErrorStat] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setErrorStat(false);
      setLoadingStat(true);

      try {
        const result = await axios(
          `https://developer.nps.gov/api/v1/parks?limit=20&api_key=EehDLFsT7C6bLbhX8mfU5ydj4C1SWawbOLY6AsD4&q=${query}`
        );

        setData(result.data);
      } catch (error) {
        setErrorStat(true);
      }

      setLoadingStat(false);
    };

    fetchData();
  }, [query]);

  return [{ data, isLoading, isError }, setQuery];
};

function App() {
  const [{ data, isLoading, isError }, setQuery] = useNPSApi();

  function QueryForm({ setQuery }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      setQuery(value);
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={handleSubmit}>search</button>
      </form>
    );
  }

  return (
    <Fragment>
      <QueryForm setQuery={setQuery} />
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.data.map(item => (
            <li key={item.id}>
              <a href={item.url}>{item.fullName}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
