import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login";
import { Navbar } from "./Components/Navbar";
import { CreatePost } from "./Pages/CreatePost/CreatePost";
function App() {
	return (
		<>
			<Router>
				<Navbar></Navbar>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/create-post" element={<CreatePost />}></Route>
					<Route path="/" element={<Home />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
