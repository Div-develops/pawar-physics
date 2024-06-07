import React, { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref, getMetadata } from "firebase/storage";
import { storage } from "../../index"; // Update the path to your Firebase config file
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import "./notes.css";

function Notes() {
  const [fileData, setFileData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("files");
  const [activeButton, setActiveButton] = useState("XI");

  const fetchFiles = async (folderRef) => {
    const itemList = await listAll(folderRef);
    const filePromises = itemList.prefixes.map(async (subFolderRef) => {
      const subItems = await listAll(subFolderRef);
      const subFilePromises = subItems.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        const fileExtension = metadata.name.split('.').pop().toLowerCase();

        return { url, name: metadata.name, folder: subFolderRef.name, fileExtension };
      });
      return Promise.all(subFilePromises);
    });
    return Promise.all(filePromises).then((results) => results.flat() );
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const cachedFileData = JSON.parse(localStorage.getItem("fileData"));
      if (cachedFileData) {
        setFileData(cachedFileData);
        setFilteredData(cachedFileData);
        setLoading(false);
        return;
      }

      const folderRef = ref(storage, className); // Use className for folder selection
      const files = await fetchFiles(folderRef);

      setFileData(files);
      setFilteredData(files);
      localStorage.setItem("fileData", JSON.stringify(files));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  
  useEffect(() => {
    fetchData();
  }, [className]); // Update useEffect dependency to refetch on className change

  const getImageUrl = (folderName) => {
    const image = fileData.find(
      (file) =>
        file.folder === folderName &&
        file.name.toLowerCase().endsWith(".jpg" || ".jpeg" || ".png")
    );
    return image ? image.url : null;
  };

  const handleSearch = (searchValue) => {
    const filteredFiles = fileData.filter((file) =>
      file.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setFilteredData(filteredFiles);
  };

  const handleClick = (e) => {
    console.log("e", e);
    localStorage.removeItem("fileData");
    if (e.target.innerText === "IX") {
      setClassName("IX")
      setActiveButton("IX")
    }

    else if (e.target.innerText === "X") {
      setClassName("X")
      setActiveButton("X")

    }

    else if (e.target.innerText === "XI") {
      setClassName("files")
      setActiveButton("XI")

    }

  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div
        style={{
          backgroundColor: "rgb(249,243,235)",
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <div className="loader-container">

          <div  className="loader" >
            </div>
            </div>
        ) : (
          <>
            <div className="notes-container">
              <div className="notes-btn-container">
                <Button
                  variant="outlined"
                  size="small"
                  className="button-50"
                    onClick={(e) => handleClick(e)}
                     style={{
                       border: activeButton === "IX" ? "2px solid #D24545" : "inherit",
                  }}
                  
                >
                  IX
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className="button-50"
                  onClick={e => handleClick(e)}
                   style={{
                     border: activeButton === "X" ? "2px solid #D24545" : "inherit",
                  }}
                >
                  X
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className="button-50"
                  onClick={e => handleClick(e)}
                   style={{
                     border: activeButton === "XI" ? "2px solid #D24545" : "inherit",
                  }}
                >
                  XI
                </Button>
              </div>

                <Grid container spacing={2} className="notes-g-container">
                  {filteredData
                    .filter((file) => file.name.endsWith(".pdf"))
                    .map((file) => (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        key={file.name}
                        className="note-item"
                      >
                        <a href={file.url} type="application/pdf">
                          <img
                            src={getImageUrl(file.folder)}
                            className="image-notes"
                            alt={file.folder}
                          />
                        </a>
                      </Grid>
                    ))}
                </Grid>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Notes;
