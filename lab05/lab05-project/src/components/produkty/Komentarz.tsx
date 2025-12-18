import { useState } from "react";

export default function Komentarz(props: {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: { id: number; username: string; fullName: string };
}) {
    const [likes, setLikes] = useState(props.likes);

    return (
        <>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                    width: "80%",
                    textAlign: "left",
                }}
            >
                <div style={{ fontWeight: "bold", color: "blue" }}>
                    {props.user.id} {props.user.username} {props.user.fullName}
                </div>
                <div style={{ margin: "10px 0" }}>{props.body}</div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    {likes}
                    <button onClick={() => setLikes(likes + 1)}>+</button>
                    <button onClick={() => setLikes(likes - 1)}>-</button>
                </div>
            </div>
        </>
    );
}
