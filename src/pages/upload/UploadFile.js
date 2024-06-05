import React, { useState } from "react";
import { ref, uploadBytes } from 'firebase/storage';
import './upload.css';
import { storage } from "../../index"; // Update the path to your Firebase config file

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const preprocessTitle = (title) => {
        // Preprocess the title to determine the appropriate folder path
        // Example: "10-rotation" goes to "X/rotation" folder
        const parts = title.split("-");
        const classFolder = getClassFolder(parts[0]);
        const subFolder = getSubFolder(parts[1]);
        return `${classFolder}/${subFolder}`;
    };

    const getClassFolder = (classTitle) => {
        // Determine the class folder based on the class title
        switch (classTitle) {
            case "9":
                return "IX";
            case "10":
                return "X";
            case "11":
                return "files";
        }
    };

    const getSubFolder = (subTitle) => {
        // Determine the subfolder based on the subtitle
        // Example: "rotation" goes to "rotation" folder
        return subTitle.toLowerCase().replace(/\s+/g, "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !image || !title || uploading) {
            console.error("File, image, or title is missing or already uploading.");
            return;
        }

        const fileFolder = preprocessTitle(title);
        const fileUploadPath = `${fileFolder}/${file.name}`;
        const imageUploadPath = `${fileFolder}/${image.name}`;

        setUploading(true);

        try {
            await Promise.all([
                uploadBytes(ref(storage, fileUploadPath), file),
                uploadBytes(ref(storage, imageUploadPath), image)
            ]);
            console.log("Upload successful!");
            setUploadStatus("Upload successful!");
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-notes-main">
            <div className="upload-notes-title">Upload Notes</div>
            <form className="form-upload-notes" onSubmit={handleSubmit}>
                <div className="fileip-form-upload">
                    <label htmlFor="fileInput">File:</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="fileip-form-upload">
                    <label htmlFor="imageInput">Image:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label htmlFor="titleInput">Title:</label>
                    <input
                        type="text"
                        id="titleInput"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <button type="submit" className="file-upload-btn" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </button>
                <p>{uploadStatus}</p>
            </form>
        </div>
    );
};

export default UploadFile;
