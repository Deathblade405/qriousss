import React, { useRef, useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import "./App.css";

const App = () => {
  const [decodedData, setDecodedData] = useState("");
  const [cameraList, setCameraList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [zoom, setZoom] = useState(250); // Default zoom value
  const scannerRef = useRef(null);

  // Get available cameras
  useEffect(() => {
    Html5Qrcode.getCameras().then((cameras) => {
      if (cameras && cameras.length > 0) {
        setCameraList(cameras);
        setSelectedCamera(cameras[0].id); // Default to the first camera
      }
    });
  }, []);

  // Start the webcam scan
  const startWebcamScan = () => {
    if (selectedCamera) {
      const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
        fps: 10, // Frame-per-second for scanning
        qrbox: { width: zoom, height: zoom }, // Use dynamic zoom value
        facingMode: selectedCamera.includes("front") ? "user" : "environment",
      });

      html5QrcodeScanner.render((decodedText) => {
        setDecodedData(decodedText);
        console.log("Decoded Text:", decodedText);
        html5QrcodeScanner.clear(); // Optionally stop scanning
      });
    }
  };

  return (
    <div className="App">
      <h1>QR Scanner</h1>

      {/* Camera Selection */}
      <div>
        <label>Select Camera:</label>
        <select
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
        >
          {cameraList.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${camera.id}`}
            </option>
          ))}
        </select>
      </div>

      {/* Zoom Control */}
      <div>
        <label>Zoom:</label>
        <input
          type="range"
          min="100"
          max="400"
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          style={{ width: "200px" }}
        />
        <span>{zoom}</span>
      </div>

      {/* Start Webcam Scan Button */}
      <button onClick={startWebcamScan}>Start Webcam Scan</button>

      {/* QR Code Scanner Display */}
      <div id="reader" ref={scannerRef}></div>

      {/* Display Decoded Data */}
      {decodedData && <p>Decoded Data: {decodedData}</p>}
    </div>
  );
};

export default App;
