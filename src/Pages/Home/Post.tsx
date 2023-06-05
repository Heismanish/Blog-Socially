import { Post as IPost } from "./Home";
import {
	getDocs,
	addDoc,
	collection,
	query,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
	post: IPost;
}

interface Like {
	likeID: string;
	userId: string;
}

export const Post = (props: Props) => {
	const { post } = props;
	const [user] = useAuthState(auth);
	const [likes, setLikes] = useState<Like[] | null>();

	const likesRef = collection(db, "Likes");

	const likesDoc = query(likesRef, where("postId", "==", post.id));

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		setLikes(
			data.docs.map((doc) => ({ userId: doc.data().userId, likeID: doc.id }))
		);
	};

	const addLike = async () => {
		try {
			const newDoc = await addDoc(likesRef, {
				userId: user?.uid,
				postId: post.id,
			});
			if (user) {
				setLikes((prev) =>
					prev
						? [...prev, { userId: user?.uid, likeID: newDoc.id }]
						: [{ userId: user?.uid, likeID: newDoc.id }]
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(
				likesRef,
				where("postId", "==", post.id),
				where("userId", "==", user?.uid)
			);

			const likeToDeleteData = await getDocs(likeToDeleteQuery);
			const likeId = likeToDeleteData.docs[0].id;
			const likeToDelete = doc(db, "Likes", likeToDeleteData.docs[0].id);
			await deleteDoc(likeToDelete);
			if (user) {
				setLikes((prev) => prev?.filter((like) => like.likeID !== likeId));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const isLikedByUser = likes?.find((like) => like.userId === user?.uid);

	useEffect(() => {
		getLikes();
	}, []);

	return (
		<>
			<div className="title">
				<h1>{post.title}</h1>
			</div>
			<div className="body">
				<p>{post.description}</p>
			</div>
			<div className="footer">
				<p>@{post.username}</p>

				<button onClick={isLikedByUser ? removeLike : addLike}>
					{isLikedByUser ? <> &#128078;</> : <>&#128077;</>}
				</button>
				{likes && <p>Likes: {likes.length}</p>}
			</div>
		</>
	);
};
