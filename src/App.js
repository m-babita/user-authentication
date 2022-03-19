import Register from "./assets/Register";
import Login from "./assets/Login";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
          path="/"
          element={ 
            <Navigate to="/login" />
          }
          />
        <Route
          path="login"
          element={
            <Login/>
          }
          />
          <Route
          path="register"
          element={
            <Register/>
          }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
