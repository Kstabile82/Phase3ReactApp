// import React from "react";
// import Rescue from "./Rescue";


// function AddNewRescue({ rescues, setRescues, newRescue }) {

//     fetch("http://localhost:9292/rescues", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newRescue)
//         })
//         .then((r) => r.json())
//         .then(newAddition => setRescues([...rescues, newAddition]));
        
//         return (
//             <div>Rescue added!
//                 <Rescue rescues={rescues} rescue={newRescue}/> 
//             </div>
//         )
  
//     }


// export default AddNewRescue;