import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../api/OnlineMovieDatabaseAPI";
import "./MediaCard.css";

const MediaCard = (props) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    name,
    media_type,
    first_air_date,
  } = props.media;

  return (
    <div className="media_card_container">
      <Link to={`/${media_type}/${id}`}>
        <img
          src={`${BASE_IMAGE_URL}${poster_path}`}
          alt={title}
          className="media_card_image"
        />
      </Link>
      <div className="media_card_text_container">
        <Link to={`/${media_type}/${id}`} className="media_card_title">
          <h4>{title || name}</h4>
        </Link>
        <p className="media_card_release_date">
          {release_date || first_air_date}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
