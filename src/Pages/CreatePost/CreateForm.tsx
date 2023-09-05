import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styles from "./CreateFrom.module.css";
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
			.max(500)
			.min(3),
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
		<>
			<form onSubmit={handleSubmit(onCreatePost)} className={styles.form}>
				<input placeholder="Title..." {...register("title")} />
				<p style={{ color: "red" }}>{errors.title?.message}</p>
				<textarea
					placeholder="Description..."
					{...register("description")}
					rows={5}
					cols={40}
				/>
				<p style={{ color: "red" }}>{errors.description?.message}</p>

				<input type="submit" className={styles.submit} />
			</form>
		</>
	);
};
