import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export const Navbar = () => {
	const [user] = useAuthState(auth);
	const signUserOut = async () => {
		await signOut(auth);
	};
	return (
		<div
			style={{
				display: "flex",
				placeItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div>
				<Link
					to="/"
					style={{
						marginRight: "1rem",
					}}
				>
					Home
				</Link>

				{!user ? (
					<Link to="/login">Login</Link>
				) : (
					<Link to="/create-post">Create Post</Link>
				)}
			</div>

			<div
				style={{
					display: "flex",
					placeItems: "center",
					justifyContent: "space-between",
				}}
			>
				{user && (
					<>
						<img
							src={user?.photoURL || ""}
							width="35"
							height="35"
							style={{ borderRadius: "50%" }}
						></img>
						<p>{user?.displayName}</p>
						<button onClick={signUserOut}>Sign Out</button>
					</>
				)}
			</div>
		</div>
	);
};
