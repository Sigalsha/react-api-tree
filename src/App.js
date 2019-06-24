import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Container from "@material-ui/core/Container";
import "./App.css";
import ResultsList from "./Results";

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
  const isEmptyResult = data.total === "0";

  function QueryForm({ setQuery }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      setQuery(value);
    };

    return (
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="search for the USA's national parks"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className="search-btn" onClick={handleSubmit}>
          search
        </button>
      </form>
    );
  }

  return (
    <Container maxWidth="md" className="container">
      <h1 id="header">USA's National Parks Service</h1>
      <QueryForm setQuery={setQuery} />
      {isError && <h1 className="no-success">Something went wrong ...</h1>}
      {isLoading ? (
        <div id="loader">
          <Loader
            type="Ball-Triangle"
            color="#284d19"
            height={300}
            width={300}
          />
        </div>
      ) : (
        <Container maxWidth="xl">
          {data.data.map(item => (
            <ResultsList
              key={item.id}
              fullName={item.fullName}
              directionsInfo={item.directionsInfo}
              description={item.description}
              states={item.states}
              url={item.url}
            />
          ))}
          {isEmptyResult && <h1 className="no-success">No result was found</h1>}
        </Container>
      )}
    </Container>
  );
}

export default App;
