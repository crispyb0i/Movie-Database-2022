import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieByID,
  fetchMovieTrailersByID,
  fetchMovieCreditsByID,
  fetchTVCreditsByID,
  fetchShowByID,
  BASE_IMAGE_URL,
  BACKDROP_URL,
} from "../../api/OnlineMovieDatabaseAPI";
import "./Media.css";
import { SiImdb } from "react-icons/si";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import PersonCard from "../../components/PersonCard/PersonCard";

const Media = (props) => {
  const { mediaType, mediaID } = useParams();
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mediaType === "movie") {
      fetchMovieByID(mediaID)
        .then((data) => setMedia(data))
        .then(() => fetchMovieTrailersByID(mediaID))
        .then((data) =>
          setMedia((prevState) => ({ ...prevState, movieVideos: data.results }))
        )
        .then(() => fetchMovieCreditsByID(mediaID))
        .then((data) =>
          setMedia((prevState) => ({ ...prevState, credits: data.cast }))
        )
        .then(() => setLoading(false));
    }

    if (mediaType === "tv")
      fetchShowByID(mediaID)
        .then((data) => setMedia(data))
        .then(() => fetchTVCreditsByID(mediaID))
        .then((data) =>
          setMedia((prevState) => ({ ...prevState, credits: data.cast }))
        )
        .then(() => setLoading(false));
  }, []);

  console.log(media);

  const {
    poster_path,
    title,
    name,
    imdb_id,
    overview,
    release_date,
    runtime,
    tagline,
    backdrop_path,
    genres,
  } = media;

  return (
    <>
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <>
          <div
            className="media_info"
            style={
              !loading && {
                backgroundImage: `linear-gradient(0deg, rgba(255 255 255 / 94%), rgba(255 0 150 / 69%)), url(${BACKDROP_URL}${backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            }
          >
            <img
              src={`${BACKDROP_URL}/${poster_path}`}
              alt={title}
              className="media_poster"
            />
            <div className="media_info_text">
              <h1>{`${title || name}`}</h1>
              {genres &&
                genres.map((genre) => <span>{` ${genre.name} `}</span>)}
              <span>- {runtime} minutes</span>
              <h4>
                <em>{tagline}</em>
              </h4>
              <h2 style={{ marginTop: "20px" }}>OVERVIEW</h2>
              <p>{overview}</p>
              <div className="media_badges">
                <a
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="_blank"
                  style={{ color: "black" }}
                  rel="noreferrer"
                >
                  <SiImdb size={40} className="media_badge" />
                </a>
                <MdOutlineFavoriteBorder size={40} className="media_badge" />
                <MdOutlineFavorite size={40} className="media_badge" />
              </div>
            </div>
          </div>
          <div className="cast_container">
            <h2>TOP BILLED CAST</h2>
            <div className="cast_container_cast">
              {media.credits.map(({ name, character, profile_path, id }) => (
                <PersonCard
                  name={name}
                  character={character}
                  profile_path={profile_path}
                  ID={id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Media;

// adult: false
// backdrop_path: "/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg"
// belongs_to_collection: {id: 618529, name: 'Doctor Strange Collection', poster_path: '/oa5uQOTY9Y4ERNrsDk7E0eC1E3h.jpg', backdrop_path: '/5ZuctJh5uX5L2dz1CjA7WsTJwZk.jpg'}
// budget: 200000000
// genres: (3) [{…}, {…}, {…}]
// homepage: "https://www.marvel.com/movies/doctor-strange-in-the-multiverse-of-madness"
// id: 453395
// imdb_id: "tt9419884"
// original_language: "en"
// original_title: "Doctor Strange in the Multiverse of Madness"
// overview: "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary."
// popularity: 3901.541
// poster_path: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
// production_companies: (2) [{…}, {…}]
// production_countries: [{…}]
// release_date: "2022-05-04"
// revenue: 942000000
// runtime: 126
// spoken_languages: (3) [{…}, {…}, {…}]
// status: "Released"
// tagline: "Enter a new dimension of Strange."
// title: "Doctor Strange in the Multiverse of Madness"
// video: false
// vote_average: 7.5
// vote_count: 2474

// adult: false
// backdrop_path: "/qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg"
// created_by: [{…}]
// episode_run_time: [55]
// first_air_date: "2019-02-15"
// genres: (3) [{…}, {…}, {…}]
// homepage: "https://www.netflix.com/title/80186863"
// id: 75006
// in_production: true
// languages: ['en']
// last_air_date: "2020-07-31"
// last_episode_to_air: {air_date: '2020-07-31', episode_number: 10, id: 2344379, name: 'The End of Something', overview: 'Reeling from the events at Dealey Plaza, the sibli… to find themselves drawn into a deadly showdown.', …}
// name: "The Umbrella Academy"
// networks: [{…}]
// next_episode_to_air: {air_date: '2022-06-22', episode_number: 1, id: 3593776, name: 'Meet the Family', overview: 'After averting a doomsday in Dallas, the Umbrella …— now ruled by the powerful and hostile Sparrows.', …}
// number_of_episodes: 30
// number_of_seasons: 3
// origin_country: ['US']
// original_language: "en"
// original_name: "The Umbrella Academy"
// overview: "A dysfunctional family of superheroes comes together to solve the mystery of their father's death, the threat of the apocalypse and more."
// popularity: 410.675
// poster_path: "/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg"
// production_companies: (2) [{…}, {…}]
// production_countries: (2) [{…}, {…}]
// seasons: (4) [{…}, {…}, {…}, {…}]
// spoken_languages: [{…}]
// status: "Returning Series"
// tagline: "Too many siblings. Not enough timeline."
// type: "Scripted"
// vote_average: 8.7
// vote_count: 7864
