import { Post as IPost } from "./Home.tsx";
import styles from "./Post.module.css";
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
	setPostsList?: any;
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
	// const postsRef = collection(db, "posts");

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

	// Delete post

	// const deletePost = async () => {
	// 	await deleteDoc(doc(db, "posts", "pHOIQvcH7Q5eis3RKMfe"));
	// 	try {
	// 		const postToDeleteQuery = query(
	// 			postsRef,
	// 			where("postId", "==", post?.postId),
	// 			where("userId", "==", user?.uid)
	// 		);
	// 		const postToDeleteData = await getDocs(postToDeleteQuery);
	// 		console.log(postToDeleteData.docs);
	// 		const postId = postToDeleteData.docs[0].id;
	// 		const postToDelete = doc(db, "Likes", postToDeleteData.docs[0].id);
	// 		await deleteDoc(postToDelete);
	// 		// if (user) {
	// 		// 	setPostsList((prev) => prev?.filter((post) => post.postID !== postId));
	// 		// }
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const deletePost = async () => {
		try {
			// Ensure that the user is the creator of the post before allowing deletion
			if (user?.uid === post.userId) {
				const postToDelete = doc(db, "posts", post.id);
				await deleteDoc(postToDelete);
				// Optionally, you can also update the state to remove the deleted post from the UI
				if (props.setPostsList) {
					props.setPostsList((prevPosts: IPost[]) =>
						prevPosts.filter((prevPost: IPost) => prevPost.id !== post.id)
					);
				}
			} else {
				console.log("You do not have permission to delete this post.");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.post}>
			<div className={styles.title}>
				<p>{post.title}</p>
			</div>
			<div className={styles.body}>
				<p>{post.description}</p>
			</div>
			<div className={styles.footer}>
				<p>@{post.username}</p>

				<button
					className={styles.likebtn}
					onClick={isLikedByUser ? removeLike : addLike}
				>
					{isLikedByUser ? <> &#128078;</> : <>&#128077;</>}
				</button>
				{likes && <p>Likes: {likes.length}</p>}
				<button onClick={deletePost}>&#128465;</button>
			</div>
		</div>
	);
};
