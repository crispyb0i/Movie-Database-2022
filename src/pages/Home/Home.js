import React, { useEffect, useState } from "react";
import { fetchAllTrending } from "../../api/OnlineMovieDatabaseAPI";
import MediaCard from "../../components/MediaCard/MediaCard";
import "./Home.css";

const Home = () => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    fetchAllTrending().then((data) => setTrending(data.results));
  }, []);

  return (
    <div className="home_container">
      <div className="media_container">
        <h1 className="container_title">Trending</h1>
        <div className="home_media_container">
          {trending.map(({ title, poster_path, id, release_date }) => (
            <MediaCard
              title={title}
              poster_path={poster_path}
              id={id}
              release_date={release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
