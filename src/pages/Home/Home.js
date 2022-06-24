import React, { useEffect, useState } from "react";
import { fetchAllTrending } from "../../api/OnlineMovieDatabaseAPI";
import MediaCard from "../../components/MediaCard/MediaCard";
import { FiSearch } from "react-icons/fi";
import "./Home.css";

const Home = () => {
	const [trending, setTrending] = useState([]);
	const [trendingTime, setTrendingTime] = useState("day");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAllTrending("all", trendingTime)
			.then((data) => {
				setTrending(data.results);
			})
			.then(() => setLoading(false))
			.catch((err) => console.log(err));
	}, [trendingTime]);

	const buttonClickHandler = (e) => {
		setTrendingTime(e.target.value);
	};

	const selectedStyle = {
		backgroundColor: "black",
		color: "white"
	};

	return (
		<div className="home_container">
			{loading ? (
				<h1>LOADING...</h1>
			) : (
				<>
					<h1 className="home_title">SHINFLIX</h1>

					{/* <div className="home_search_input_container">
			
        <input type="text" className="home_search_input" />
        <button>
          <FiSearch size={40} />
        </button>
      </div> */}

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
