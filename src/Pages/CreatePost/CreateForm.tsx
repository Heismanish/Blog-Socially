import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export interface createFormData {
	title: string;
	description: string;
}

export const CreateForm = () => {
	const navigate = useNavigate();
	const [user] = useAuthState(auth);

	const schema = yup.object().shape({
		title: yup.string().required("You must add a title"),
		description: yup
			.string()
			.required("You can not post without a description ")
			.max(300),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<createFormData>({
		resolver: yupResolver(schema),
	});

	const postRef = collection(db, "posts");

	const onCreatePost = async (data: createFormData) => {
		await addDoc(postRef, {
			...data,
			username: user?.displayName,
			userId: user?.uid,
		});
		navigate("/");
	};
	return (
		<form onSubmit={handleSubmit(onCreatePost)}>
			<input placeholder="Title..." {...register("title")} />
			<p style={{ color: "red" }}>{errors.title?.message}</p>
			<textarea placeholder="Description..." {...register("description")} />
			<p style={{ color: "red" }}>{errors.description?.message}</p>

			<input type="submit" />
		</form>
	);
};
