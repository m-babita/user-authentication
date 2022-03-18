import "./assets.css";
import { useNavigate } from "react-router-dom";

const LoggedIn = ({ setLoggedIn, name }) => {
	const navigator = useNavigate();

	const logOutHandler = (e) => {
		setLoggedIn(false);
		navigator("/login");
	};
	return (
		<div>
			<nav>
				<ul>
					<li>User-Auth</li>
					<li>
						<button className="btn-log-out" onClick={logOutHandler}>
							Log-Out
						</button>
					</li>
				</ul>
			</nav>
			<h1>Welcome Back, {name}</h1>
		</div>
	);
};

export default LoggedIn;
