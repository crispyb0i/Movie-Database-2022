import { BASE_IMAGE_URL } from "../../api/OnlineMovieDatabaseAPI";
import { Link } from "react-router-dom";
import "./PersonCard.css";

const PersonCard = ({ name, profile_path, ID, character }) => {
  return (
    <Link to={`/person/${ID}`} className="person_container">
      <img
        src={
          profile_path
            ? `${BASE_IMAGE_URL}${profile_path}`
            : "https://cushwakewr.com/wp-content/uploads/2017/08/Blank-Placeholder.jpg"
        }
        alt={name}
        className="person_image"
      />
      <div className="person_text_container">
        <h4 className="person_name">{name}</h4>
        <p className="person_role">{character}</p>
      </div>
    </Link>
  );
};

export default PersonCard;

// adult: false
// cast_id: 2
// character: "Dr. Stephen Strange / Sinister Strange / Defender Strange"
// credit_id: "58fa84bbc3a36879f40021db"
// gender: 2
// id: 71580
// known_for_department: "Acting"
// name: "Benedict Cumberbatch"
// order: 0
// original_name: "Benedict Cumberbatch"
// popularity: 78.732
// profile_path: "/fBEucxECxGLKVHBznO0qHtCGiMO.jpg"
