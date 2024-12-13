import React, { useRef, useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import "./App.css";

const App = () => {
  const [decodedData, setDecodedData] = useState("");
  const [cameraList, setCameraList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [qrBoxSize, setQrBoxSize] = useState(250); // Initial QR box size
  const scannerRef = useRef(null);

  // Get available cameras
  useEffect(() => {
    Html5Qrcode.getCameras().then((cameras) => {
      if (cameras && cameras.length > 0) {
        setCameraList(cameras);
        setSelectedCamera(cameras[0].id); // Automatically select the first camera
      }
    });
  }, []);

  // Start the webcam scan
  const startWebcamScan = () => {
    if (selectedCamera) {
      const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
        fps: 10, // Frame-per-second for scanning
        qrbox: { width: qrBoxSize, height: qrBoxSize }, // Dynamic zoom value
        facingMode: selectedCamera.includes("front") ? "user" : "environment",
      });

      html5QrcodeScanner.render((decodedText) => {
        setDecodedData(decodedText);
        console.log("Decoded Text:", decodedText);
        html5QrcodeScanner.clear(); // Optionally stop scanning
      }, (errorMessage) => {
        // Handle error (optional)
        console.log(errorMessage);
      });
    }
  };

  // Adjust QR box size dynamically (auto-zoom)
  const handleScanSuccess = (decodedText, decodedResult) => {
    const qrCodeSize = decodedResult.result.size || 250; // Adjust size logic as needed
    const newQrBoxSize = qrCodeSize > 250 ? qrCodeSize : 250; // Ensure a minimum size of 250px
    setQrBoxSize(newQrBoxSize);
    setDecodedData(decodedText);
    console.log("Decoded Text:", decodedText);
  };

  return (
    <div className="App">
      <h1>QR Scanner</h1>

      {/* Automatically selects the first available camera */}
      <div>
        <button onClick={startWebcamScan}>Start Webcam Scan</button>
      </div>

      {/* QR Code Scanner Display */}
      <div id="reader" ref={scannerRef}></div>

      {/* Display Decoded Data */}
      {decodedData && <p>Decoded Data: {decodedData}</p>}
    </div>
  );
};

export default App;
