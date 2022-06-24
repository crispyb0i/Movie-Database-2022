import { fetchPersonByID } from "../../api/OnlineMovieDatabaseAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../api/OnlineMovieDatabaseAPI";

const Person = () => {
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPersonByID(personID)
      .then((data) => setPerson(data))
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
  } = person;

  return (
    <>
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <div>
          <img src={`${BASE_IMAGE_URL}${profile_path}`} alt={person.name} />
          <div>
            <h1>{name}</h1>
            {place_of_birth && (
              <>
                <h4>PLACE OF BIRTH</h4>
                <p>{place_of_birth}</p>
              </>
            )}
            {biography && (
              <>
                <h4>BIOGRAPHY</h4>
                <p>{biography}</p>
              </>
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
