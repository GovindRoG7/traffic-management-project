import { roadPath }  from "../config";

const transformVehicleData = (vehicleData,selectedRoad) => {
    let results = [];
    let vehicleHistory = {}; // keep track of vehicles till now
  
    vehicleData.forEach((entry) => {
      let currentCount = {}; // stores the current vehicle count
      let vehiclesAtTime = []; // stores the vehicles at current timestamp
  
      ["bus", "Auto", "car", "motorcycle"].forEach((type) => {
        currentCount[type] = entry[type]; // extract the count of current vehicle type
        if (!vehicleHistory[type]) vehicleHistory[type] = []; // if this is the first time encountering this type, initilaize with empty array
       
        // keep only required no of vehicles
        // if vehicle increased , need to add new vehicles
        // if vehicle decreased, delete the excess vehicle from past
        // create a deep copy
        let existingVehicles = JSON.parse(JSON.stringify(vehicleHistory[type].slice(0, currentCount[type])))
        
        let newVehicles = []; // store newly created vehicle
        
        // new vehicle creation process, if previous count
        // is lower than current count
        for(let i = existingVehicles.length; i < currentCount[type]; i++) {
          newVehicles.push({ id: vehicleHistory[type].length + i + 1, type, index: Math.floor(Math.random() * roadPath[selectedRoad].length)});
        }
  
        // move forward the existing vehicles
        existingVehicles.forEach((vehicle) => {
          if(vehicle.index + 1 >= roadPath[selectedRoad].length) vehicle.index = 0; // start from over
          else vehicle.index++;
        });
        // update the history with updated existing vehicles 
        // and newly created vehicles
        vehicleHistory[type] = [...existingVehicles, ...newVehicles];
      
        // add the current history to vehiclesat time array
        vehiclesAtTime.push(...vehicleHistory[type]);
        
      });
      results.push(vehiclesAtTime);
    });
    return results;
  };

export {transformVehicleData}