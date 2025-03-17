import React, { useState } from "react";

const convertDateToUnix = (dateString) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

const TimeRangeSelector = ({ onFetchData, selectedRoad, setSelectedRoad}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const handleFetchData = () => {
    if (!selectedRoad || !startTime || !endTime) {
      alert("Please select a road and provide both start and end times!");
      return;
    }
    const startUnix = convertDateToUnix(startTime);
    const endUnix = convertDateToUnix(endTime);
    onFetchData(selectedRoad, startUnix, endUnix);
  };

  return (
    <div>
      <label>
        Select Road:
        <select value={selectedRoad} onChange={(e) => setSelectedRoad(e.target.value)}>
          <option value="palayam">Palayam</option>
          <option value="PuthiyaStand">Puthiya Stand</option>
          <option value="stadiumJn">Stadium Jn</option>
          <option value="highway">Highway</option>
          <option value="rajpath">Rajpath</option>
        </select>
      </label>
      { selectedRoad && (
        <>
          <label>
            Start Time:
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label>
            End Time:
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
          <button onClick={handleFetchData}>Fetch Data</button>
        </>
      )}
    </div>
  );
};

export default TimeRangeSelector;
