import React, { useState } from "react";
import './upload.css'
const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename",file.name)
        formData.append("name", name);
        formData.append("description", description);

        try {
            await fetch("http://localhost:9000/upload", {
                method: "POST",
                body: formData,
            });

            // Handle the response as needed
            console.log("Upload successful!");
        } catch (error) {
            // Handle the error
            console.error("Upload failed:", error);
        }
    };

    return (
        <div className="upload-notes-main">
            <div className="upload-notes-title">Upload Notes</div>
            <form className = "form-upload-notes" onSubmit={handleSubmit}>
                <div className="fileip-form-upload">
                    <label htmlFor="fileInput">File:</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label htmlFor="nameInput">Title:</label>
                    <input
                        type="text"
                        id="nameInput"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                    <label htmlFor="descriptionInput">Description:</label>
                    <textarea
                        id="descriptionInput"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <button type="submit" className="file-upload-btn">Upload</button>
            </form>
        </div>
    );
};

export default UploadFile;
