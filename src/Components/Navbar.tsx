import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import styles from "./Navbar.module.css";

export const Navbar = () => {
	const [user] = useAuthState(auth);
	const signUserOut = async () => {
		await signOut(auth);
	};
	return (
		<div className={styles.navbar}>
			<div>
				<Link to="/" className={styles.navbtn}>
					Home
				</Link>

				{!user ? (
					<Link to="/login" className={styles.navbtn}>
						Login
					</Link>
				) : (
					<Link to="/create-post" className={styles.navbtn}>
						Create Post
					</Link>
				)}
			</div>

			<div
				className={styles.userinfo}
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
						<p className={styles.username}>
							{user?.displayName?.split(" ")[0]}
						</p>
						<button onClick={signUserOut}>Sign Out</button>
					</>
				)}
			</div>
		</div>
	);
};
