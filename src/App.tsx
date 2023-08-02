import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home.tsx";
import { Login } from "./Pages/Login.tsx";
import { Navbar } from "./Components/Navbar.tsx";
import { CreatePost } from "./Pages/CreatePost/CreatePost.tsx";
function App() {
	return (
		<>
			<div>
				<Router>
					<Navbar></Navbar>
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/create-post" element={<CreatePost />}></Route>
						<Route path="/" element={<Home />}></Route>
					</Routes>
				</Router>
			</div>
		</>
	);
}

export default App;
