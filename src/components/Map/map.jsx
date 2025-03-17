import React, { useEffect, useState,useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { roadPath,roadCenter, vehicleColors,legendVehicle} from "../config";
import { transformVehicleData } from "./transformVehicleData";

const Map = ({ vehicleData , selectedRoad}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // memorize the function , rerun only when dependencies change
  const vehicleAnimated = useMemo(() => transformVehicleData(vehicleData, selectedRoad), [vehicleData]);

  useEffect(() => {
    if (!vehicleData || vehicleData.length === 0) return;
    if (!isRunning) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < vehicleAnimated.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 1000); // Move to next timestamp every second

    return () => clearInterval(interval);
  }, [isRunning, vehicleData]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev); // Toggle between running and paused
  };

  const handleReset = () => {
    setCurrentIndex(0); // Restart from first timestamp
    setIsRunning(false); // stop the execution by default
  };

  const currentData = vehicleAnimated[currentIndex] || []; // array of vehicles in current timestamp with their unique id
  return (
    <div style={{ display: "flex",marginLeft: "15px", padding: "10px",borderRadius: "5px", height: "fit-content" }}>
      <MapContainer 
        center={roadCenter[selectedRoad]} 
        zoom={22} 
        style={{ width: "800px", height: "500px" }}
        zoomControl={false} 
        scrollWheelZoom={false} 
        doubleClickZoom={false} 
        dragging={false}
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={roadPath[selectedRoad]} color="blue" weight={0.5} />

        
        { currentData.map((vehicle) => (
            <CircleMarker
              key={`${vehicle.type}-${vehicle.id}`}
              center={roadPath[selectedRoad][vehicle.index]}
              radius={vehicleColors[vehicle.type].size}
              fillColor={vehicleColors[vehicle.type].color}
              color={vehicleColors[vehicle.type].color}
              fillOpacity={1}
            />
          ))}
      </MapContainer>
      <div style={{ marginLeft: "10px", padding: "10px", background: "white", borderRadius: "5px", height: "fit-content" }}>
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
           Time: {vehicleData[currentIndex].detection_time ? new Date(vehicleData[currentIndex].detection_time * 1000).toLocaleString() : "N/A"}
        </p>
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
          Road: {vehicleData[currentIndex].road_name}
        </p>
        
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleToggle} style={buttonStyle}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset} style={buttonStyle}>Reset</button>
        </div>

        {Object.entries(legendVehicle).map(([type, { color, size }]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <div
              style={{
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                backgroundColor: color,
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <span>{type}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

// Button styling
const buttonStyle = {
  margin: "5px",
  padding: "2px 5px",
  fontSize: "12px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  backgroundColor: "#007BFF",
  color: "white",
};


export default Map;