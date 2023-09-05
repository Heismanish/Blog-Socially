import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post.tsx";
import styles from "./Home.module.css";

export interface Post {
	id: string;
	userId: string;
	title: string;
	description: string;
	username: string;
}

export const Home = () => {
	const [postsList, setPostsList] = useState<Post[] | null>(null);
	const postRef = collection(db, "posts");

	const getPosts = async () => {
		const data = await getDocs(postRef);
		setPostsList(
			data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
		);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className={!postsList ? styles.emptymsg : styles.posts}>
			{!postsList && <h2>Login to see the posts</h2>}
			{postsList?.map((post) => (
				<Post post={post} setPostsList={setPostsList} />
			))}
		</div>
	);
};
