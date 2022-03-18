import "./assets.css";
import { useNavigate, useContext } from "react-router-dom";
import AuthContext from './AuthProvider'

const LoggedIn = () => {
	const {setAuth} = useContext(AuthContext)
	const navigator = useNavigate();

	const logOutHandler = (e) => {
		setAuth({ userName})
		setSuccess(false);
		navigator("/login");
	};
	return (
		<div>
			<button className="btn-log-out" onClick={logOutHandler}>
			Log-Out
			</button>
			Welcome Back, {userName}
		</div>
	);
};

export default LoggedIn;
