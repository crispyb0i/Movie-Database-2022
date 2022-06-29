import React, { useEffect, useState } from "react";
import {
  fetchAllTrending,
  multiSearch,
} from "../../api/OnlineMovieDatabaseAPI";
import MediaCard from "../../components/MediaCard/MediaCard";
import { FiSearch } from "react-icons/fi";
import { Oval } from "react-loading-icons";
import "./Home.css";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchAllTrending("all", trendingTime)
      .then((data) => {
        setTrending(data.results);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [trendingTime]);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value.trim());
  };

  const searchHandler = () => {
    setSearchLoading(true);
    multiSearch(inputValue)
      .then((data) => {
        setSearchResults(data.results);
      })
      .then(() => setSearchLoading(false));
  };

  const buttonClickHandler = (e) => {
    setTrendingTime(e.target.value);
  };

  const selectedStyle = {
    backgroundColor: "black",
    color: "white",
  };

  return (
    <div className="home_container">
      {loading ? (
        <div className="loading_icon">
          <Oval stroke="black" style={{ textAlign: "center" }} />
        </div>
      ) : (
        <>
          <h1 className="home_title">SHINFLIX</h1>

          <div className="home_search_input_container">
            <input
              type="text"
              className="home_search_input"
              onChange={inputChangeHandler}
              placeholder="Search for movie, TV show, or person"
              onKeyPress={(e) => {
                if (e.key === "Enter") searchHandler();
              }}
            />
            <button
              className="home_search_input_button"
              onClick={searchHandler}
            >
              <FiSearch size={40} />
            </button>
          </div>

          {searchLoading ? (
            <div className="loading_icon_search">
              <Oval stroke="black" style={{ textAlign: "center" }} />
            </div>
          ) : (
            <>
              <div className="search_results_container">
                <div className="search_results">
                  {searchResults.length === 0 && <h1>No results found</h1>}
                  {searchResults &&
                    searchResults.map((result) => (
                      <MediaCard media={result} key={result.id} />
                    ))}
                </div>
              </div>

              <div className="media_container">
                <div className="container_header">
                  <h1 className="container_title">Trending</h1>
                  <button
                    className="trending_time_button"
                    onClick={buttonClickHandler}
                    value={"day"}
                    style={trendingTime === "day" ? selectedStyle : null}
                  >
                    DAY
                  </button>
                  <button
                    className="trending_time_button"
                    onClick={buttonClickHandler}
                    value={"week"}
                    style={trendingTime === "week" ? selectedStyle : null}
                  >
                    WEEK
                  </button>
                </div>

                <div className="home_media_container">
                  {trending.map((media) => (
                    <MediaCard media={media} key={media.id} />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
