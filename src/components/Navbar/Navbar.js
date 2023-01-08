import "./Navbar.css"
import { Link } from "react-router-dom"
import logo from "../../assets/shinflixLogo.png"

const Navbar = () => {
	return (
		<ul className="navbar_container">
			<div className="navbar_items_left">
				<li className="navbar_item logo">
					<Link to="/" style={{ color: "red" }}>
						<img
							src={logo}
							alt="logo"
							style={{ width: "100px", paddingTop: "5px" }}
						/>
					</Link>
				</li>
			</div>
			<div className="navbar_items_right">
				{/* <li className="navbar_item">Login</li> */}
			</div>
		</ul>
	)
}

export default Navbar
