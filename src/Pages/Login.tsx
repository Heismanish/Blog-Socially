import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
export const Login = () => {
	const navigate = useNavigate();
	const signInWithGoogle = async () => {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		navigate("/");
	};

	return (
		<>
			<p>Sign In with Google to Continue</p>
			<button onClick={signInWithGoogle}> Sign In </button>
		</>
	);
};
