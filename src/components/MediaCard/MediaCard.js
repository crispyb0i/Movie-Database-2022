import { Link } from "react-router-dom";
import "./MediaCard.css";

const MediaCard = ({ id, title, poster_path, release_date }) => {
  const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/w300`;
  return (
    <div className="media_card_container">
      <Link to={`/movie/${id}`}>
        <img
          src={`${BASE_IMAGE_URL}${poster_path}`}
          alt={title}
          className="media_card_image"
        />
      </Link>
      <div className="media_card_text_container">
        <Link to={`/movie/${id}`} className="media_card_title">
          <h4>{title}</h4>
        </Link>
        <p className="media_card_release_date">{release_date}</p>
      </div>
    </div>
  );
};

export default MediaCard;
