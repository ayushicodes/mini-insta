import React from "react"
import './post.css';
import { Avatar } from "@material-ui/core";
function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__Avatar"
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                />
                <h3>username</h3>
            </div>

            <img
                className="post__image"
                src="https://th.bing.com/th/id/OIP.IaFMwJ2SIJ4d4Sl_5ekM2AAAAA?w=168&h=180&c=7&r=0&o=5&pid=1.7"
                alt="post_img" />


            <h5 className="post__text"> <strong>ayuc_rai</strong>  I am feeling awesome</h5>
        </div>
    )
}
export default Post