import { useState, useEffect } from "react";

import Komentarz from "./Komentarz";

export default function Komentarze() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            .then((res) => setData(res.comments));
    }, []);

    return (
        <>
            <div>
                {data.map((com) => (
                    <Komentarz
                        id={com.id}
                        body={com.body}
                        likes={com.likes}
                        postId={com.postId}
                        user={com.user}
                        key={com.id}
                    />
                ))}
            </div>
        </>
    );
}
