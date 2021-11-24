import React from "react"
import './post.css';
import { Avatar } from "@material-ui/core";
function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__Avatar"
                    alt={username}
                    src="/broken-image.jpg"
                />
                <h3>{username}</h3>
            </div>

            <img
                className="post__image"
                src={imageUrl}
                alt="post_img" />


            <h5 className="post__text"> <strong>{username}:</strong> {caption}</h5>
        </div>
    )
}
export default Post