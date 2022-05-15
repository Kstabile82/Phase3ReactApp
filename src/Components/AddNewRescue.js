import React from "react";

function AddNewRescue({ rescues, setRescues, newRescue }) {

    fetch("http://localhost:9292/rescues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRescue)
        })
        .then((r) => r.json())
        .then(newAddition => console.log([...rescues, newAddition]));

        // .then(newAddition => setRescues([...rescues, newAddition]));
        
        return (
            <div>
            </div>
        )
  
    }


export default AddNewRescue;