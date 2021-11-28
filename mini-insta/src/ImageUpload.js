import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from 'firebase/compat'
import { storage, db } from "./firebase";

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url);

                        // post image inside db
                        db.collection("posts").add({
                            imageUrl: url,
                            caption: caption,
                            username: username,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        );
    };

    return (
        <div>
            <progress value={progress} max="100" />
            <input
                type="text"
                placeholder="Enter caption"
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
            />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>UPLOAD</Button>
        </div>
    );
}

export default ImageUpload;