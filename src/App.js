import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Thumbnail, setThumbnail] = useState("");
  const [videoDownloadURL, setvideoDownloadURL] = useState("");
  const [error, seterror] = useState(false);

  const getApidata = async () => {
    const options = {
      method: "GET",
      url: "https://social-media-video-downloader.p.rapidapi.com/smvd/get/all",
      params: {
        url: videoUrl,
        filename: "Test video",
      },
      headers: {
        'X-RapidAPI-Key': '837f711953msh010d74bb5cbbce8p1cb89ejsnd35818409dd4',
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setVideoData(response.data);
      setThumbnail(response.data.picture);
      const [{ link }] = response.data.links;
      setvideoDownloadURL(link);
      setIsLoading(false);
    } catch (error) {
      seterror(true);
    }
  };

  return (
    <div className="container bg-gray-100">
      <a
        href="https://www.instagram.com/fayaq_here/?hl=en"
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 flex-row justify-center items-center"
      >
        <img
          className="h-8"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
          alt="Instagram"
          srcSet=""
        />
        <h1 className="text-xl text-black font-semibold font-mono">
          Made By{" "}
          <a href="https://www.instagram.com/fayaq_here/?hl=en" target="_blank">
            <u>Fayaq Ali</u>
          </a>
        </h1>
      </a>
      <div className="content">
        <h1 className="text-center p-2 mb-2 text-4xl font-bold bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 inline-block text-transparent bg-clip-text">
          Download Your Instagram Reel Here
        </h1>

        <input
          type="text"
          value={videoUrl}
          className="p-4 rounded border-2 focus:outline-none border-blue-800"
          placeholder="Enter the URL"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button className="button" onClick={getApidata}>
          Get Video
        </button>
        {isLoading && (
          <div className="text-black bg-transparent mt-5">Hang on...</div>
        )}
        {videoData && !error && (
          <div className="flex flex-col items-center border-2 border-indigo-800 w-10/12 p-5 m-5">
            <img
              src={Thumbnail}
              alt=""
              className="h-40 w-40 object-cover mb-2"
            />
            <a
              href={videoDownloadURL}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Download
            </a>
          </div>
        )}

        {error && (
          <div className="p-5 m-5 text-white bg-red-600 rounded">
            Something went wrong...
          </div>
        )}
      </div>
      {/* <div className="flex justify-center items-center mt-8">
        <div className="flex flex-col items-center">
          <img
            src="./QR.png" // Replace with your QR code image URL
            alt="Scan QR Code"
            className="h-32 w-32" // Adjust size as needed
          />
          <p className="mt-2 text-sm font-semibold">
            Scan QR to get the App
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
