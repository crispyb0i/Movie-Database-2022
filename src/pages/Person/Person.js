import {
  fetchPersonByID,
  fetchPersonCredits,
  fetchPersonSocials,
} from "../../api/OnlineMovieDatabaseAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, BACKDROP_URL } from "../../api/OnlineMovieDatabaseAPI";
import "./Person.css";
import MediaCard from "../../components/MediaCard/MediaCard";
import { GrDomain } from "react-icons/gr";
import { SiImdb } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { Oval } from "react-loading-icons";

const Person = () => {
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPersonByID(personID)
      .then((data) => setPerson(data))
      .then(
        fetchPersonCredits(personID).then((credits) =>
          setPerson((prev) => {
            return { ...prev, combined_credits: credits };
          })
        )
      )
      .then(
        fetchPersonSocials(personID).then((socials) => {
          setPerson((prev) => {
            return { ...prev, socials };
          });
        })
      )
      .then(() => setLoading(false));
  }, []);

  const { personID } = useParams();

  const {
    name,
    biography,
    homepage,
    id,
    imdb_id,
    known_for_department,
    place_of_birth,
    profile_path,
    birthday,
    deathday,
    also_known_as,
    combined_credits,
    socials,
  } = person;

  return (
    <>
      {loading ? (
        <div className="loading_icon">
          <Oval stroke="black" style={{ textAlign: "center" }} />
        </div>
      ) : (
        <div className="person_page_container">
          <div className="left_panel">
            <img
              src={
                profile_path
                  ? `${BACKDROP_URL}/${profile_path}`
                  : `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flittlesmilespa.org%2Fwp-content%2Fuploads%2F2016%2F08%2Fperson-placeholder-723x1024.png&f=1&nofb=1`
              }
              alt={name}
            />
            <div className="left_panel_text">
              <div className="socials">
                {homepage && (
                  <a href={homepage}>
                    <GrDomain />
                  </a>
                )}
                {imdb_id && (
                  <a
                    href={`https://www.imdb.com/name/${imdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social_icon"
                  >
                    <SiImdb size={35} />
                  </a>
                )}
                {socials && socials.facebook_id && (
                  <a
                    href={`https://www.facebook.com/${person.socials.facebook_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social_icon"
                  >
                    <FaFacebookF size={35} />
                  </a>
                )}
                {socials && socials.instagram_id && (
                  <a
                    href={`https://www.instagram.com/${person.socials.instagram_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social_icon"
                  >
                    <BsInstagram size={35} />
                  </a>
                )}
                {socials && socials.twitter_id && (
                  <a
                    href={`https://www.twitter.com/${person.socials.twitter_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="social_icon"
                  >
                    <FiTwitter size={35} />
                  </a>
                )}
              </div>
              {birthday && (
                <div className="left_info_section">
                  <h4>BIRTHDAY</h4>
                  <p>{birthday}</p>
                </div>
              )}
              {deathday && (
                <div className="left_info_section">
                  <h4>DATE OF DEATH</h4>
                  <p>{deathday}</p>
                </div>
              )}
              {place_of_birth && (
                <div className="left_info_section">
                  <h4>PLACE OF BIRTH</h4>
                  <p>{place_of_birth}</p>
                </div>
              )}
              {also_known_as.length > 0 && (
                <div className="left_info_section">
                  <h4>ALSO KNOWN AS</h4>
                  {also_known_as.map((name) => (
                    <p key={`aka-${name}`}>{name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="right_panel">
            <h1 className="person_name">{name}</h1>
            {biography && (
              <>
                <h4>BIOGRAPHY</h4>
                <p>{biography}</p>
              </>
            )}
            {combined_credits && (
              <div className="credits_container">
                <h4>KNOWN FOR</h4>
                <div className="credits">
                  {combined_credits.cast.map((credit) => (
                    <MediaCard media={credit} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Person;

// {
//   "adult": false,
//   "also_known_as": [
//   "Millie Brown",
//   "밀리 바비 브라운",
//   "밀리 보비 브라운",
//   "Μίλι Μπόμπι Μπράουν",
//   "Μίλι Μπράουν",
//   "米莉·博比·布朗",
//   "ميلي بوبي براون",
//   "MBB",
//   "Міллі Боббі Браун",
//   "Милли Бобби Браун"
//   ],
//   "biography": "Millie Bobby Brown (born 19 February 2004) is an English actress and producer. She was born in Spain, to British parents. They moved to Orlando, Florida in 2011, where Millie went to acting workshops to pass the time on a Saturday, and it was there that a top Hollywood talent scout called and told Millie's parents that \"she has instincts you cannot teach.\" She advised Millie's parents that Millie could \"mix it with the best kids in Hollywood.\" They packed up and drove from Orlando to Los Angeles, and within a week, Millie was meeting with the town's top children's talent agencies. She was offered representation by all the agents that she met. Within three months of being in Hollywood, Millie was offered the role of young Alice in ABC's Once Upon a Time in Wonderland. In November 2013, after just one self-taped audition, and without meeting the producers/directors, Millie was offered the role of Madison O'Donnell in BBC America's show, \"Intruders.\"",
//   "birthday": "2004-02-19",
//   "deathday": null,
//   "gender": 1,
//   "homepage": null,
//   "id": 1356210,
//   "imdb_id": "nm5611121",
//   "known_for_department": "Acting",
//   "name": "Millie Bobby Brown",
//   "place_of_birth": "Marbella, Málaga, Andalusia, Spain",
//   "popularity": 45.858,
//   "profile_path": "/cso2aK5Aeallh0AY7nOgqnfKqEd.jpg"
//   }
