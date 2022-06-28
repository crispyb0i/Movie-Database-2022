import React, { useEffect, useState } from "react";
import {
  fetchAllTrending,
  movieSearch,
} from "../../api/OnlineMovieDatabaseAPI";
import MediaCard from "../../components/MediaCard/MediaCard";
import { FiSearch } from "react-icons/fi";
import "./Home.css";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
    movieSearch(inputValue)
      .then((data) => {
        data.results.forEach((movie) => (movie.media_type = "movie"));
        setSearchResults(data.results);
      })
      .then(() => setSearchLoading(false));
    // 		adult: false
    // backdrop_path: "/s8n4LDU1vMDMmHB0z2h4Pq9bAiZ.jpg"
    // genre_ids: [35]
    // id: 239568
    // original_language: "en"
    // original_title: "Search Party"
    // overview: "Two oafs must rescue their stranded pal in Mexico."
    // popularity: 7.623
    // poster_path: "/qnhMdtcbZnzcA9cMuZttwosaXji.jpg"
    // release_date: "2014-10-30"
    // title: "Search Party"
    // video: false
    // vote_average: 5.4
    // vote_count: 152
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
        <h1>LOADING...</h1>
      ) : (
        <>
          <h1 className="home_title">SHINFLIX</h1>

          <div className="home_search_input_container">
            <input
              type="text"
              className="home_search_input"
              onChange={inputChangeHandler}
            />
            <button
              className="home_search_input_button"
              onClick={searchHandler}
            >
              <FiSearch size={40} />
            </button>
          </div>

          {searchLoading ? (
            <h1>LOADING...</h1>
          ) : (
            <div className="search_results_container">
              <div className="search_results">
                {searchResults.map((movie) => (
                  <MediaCard media={movie} key={movie.id} />
                ))}
              </div>
            </div>
          )}

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
    </div>
  );
};

export default Home;
