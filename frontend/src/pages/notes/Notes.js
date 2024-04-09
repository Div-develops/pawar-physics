/**
 * Fetches PDF files and images from Firebase Storage,
 * displays PDF links with corresponding preview images.
 *
 * Fetches URLs and metadata for PDFs and images using Firebase Storage API.
 * Stores URLs in React state.
 * Renders preview images for each PDF file, linking to the PDF URL.
 * Matches preview images to PDFs by comparing file names.
 */
import React, { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref, getMetadata } from "firebase/storage";
import { storage } from "../../index"; // Update the path to your Firebase config file

function Notes() {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [pdfNames, setPdfNames] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async (folderRef) => {
    const itemList = await listAll(folderRef);
    const urlPromises = itemList.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return url;
    });
    return Promise.all(urlPromises);
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when starting to fetch PDFs and images

      const cachedPdfUrls = JSON.parse(localStorage.getItem("pdfUrls"));
      const cachedPdfNames = JSON.parse(localStorage.getItem("pdfNames"));
      const cachedImageUrls = JSON.parse(localStorage.getItem("imageUrls"));

      if (cachedPdfUrls && cachedPdfNames && cachedImageUrls) {
        setPdfUrls(cachedPdfUrls);
        setPdfNames(cachedPdfNames);
        setImageUrls(cachedImageUrls);
        setLoading(false); // Set loading to false since data is already available
        return;
      }

      const pdfsFolderRef = ref(storage, 'files/files');
      const imagesFolderRef = ref(storage, 'files/images');

      const [pdfUrls, imageUrls] = await Promise.all([
        fetchUrls(pdfsFolderRef),
        fetchUrls(imagesFolderRef)
      ]);

      setPdfUrls(pdfUrls);
      setImageUrls(imageUrls);

      // Fetch PDF names
      const pdfMetadataPromises = pdfUrls.map(async (url) => {
        const metadata = await getMetadata(ref(storage, url));
        return metadata.name;
      });

      const pdfNames = await Promise.all(pdfMetadataPromises);
      setPdfNames(pdfNames);

      // Cache the fetched data
      localStorage.setItem("pdfUrls", JSON.stringify(pdfUrls));
      localStorage.setItem("pdfNames", JSON.stringify(pdfNames));
      localStorage.setItem("imageUrls", JSON.stringify(imageUrls));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after both PDFs and images are fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to get the corresponding image URL based on PDF name
  const getImageUrl = (pdfName) => {
    const index = pdfNames.findIndex((name) => name === pdfName);
    return index !== -1 ? imageUrls[index] : null;
  };

  return (
    <div className="pdf-container">
      {loading && <p>Loading...</p>}
      {!loading &&
        pdfNames.map((pdfName) => (
          <div key={pdfName} style={{ margin: "20px" }}>
            <a
              href={pdfUrls.find((url, index) => pdfNames[index] === pdfName)}
              type="application/pdf"
            >
              <img
                src={getImageUrl(pdfName)}
                style={{ height: "100px", width: "50px" }}
                alt={`${pdfName}`}
              />
            </a>
          </div>
        ))}
    </div>
  );
}

export default Notes;
