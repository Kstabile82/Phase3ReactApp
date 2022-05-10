import React, { useEffect, useState } from "react";
import './App.css';
import Rescue from './Components/Rescue' 

function App() {
 const [rescues, setRescues] = useState([])
 const [rescue, setRescue] = useState("")
 const [loggedOut, setLoggedOut] = useState(true);
//  const [added, setAdded] = useState("");
 const [inputID, setInputID] = useState(0);

// let name = "";
//  const [id, setId] = useState(0)
 const [submitted, setSubmitted] = useState(false)
   useEffect(() => {
     fetch("http://localhost:9292/rescues")
      .then((r) => r.json())
      .then((rescuelist) => setRescues(rescuelist));
   }, []);
    
  //  function handleClick(e) {
  //    rescues.map((r) => {
  //      if (r.name === e.target.innerText) {
  //        setRescue(r)
  //        setSubmitted(true)
  //        setLoggedOut(false)
  //      }
  //    })
  //  }

//    function handleName(e) {
//     e.preventDefault();
//     setAdded("")
//     setRescue(e.target.parentElement.firstChild.nextSibling.value);
//      if (inputname === "") {
//          setAdded("false");
//      }
//       let findMatch = userData.find(listItem => listItem.name.toLowerCase() === inputname.toLowerCase()); 
//               if (findMatch !== undefined) {
//                  setUser(findMatch)
//                  setLoggedOut(false);

//               }
//               else {
//                   setAdded("mismatch")
//               }       
//  }
//  function handleAdd(e) {
//      e.preventDefault();
//      setAdded("");
    //  name = e.target.value;
//  }

//  function handleSubmit(e) {
//      e.preventDefault();
//       if (rescue === "") {
//          setAdded("false")
//       } 
//       else {
//          let idMatch = rescues.find(r => r.id === id); 
//          if (idMatch === undefined) {
//              fetch ("http://localhost:3000/users", {
//              method: "POST",
//              headers: {
//              "Content-Type": "application/json",
//                  },
//                  body: JSON.stringify({
//                  name,
//                  workouts,
//                  }),
//              })
//              .then((r) => r.json())
//              setAdded("true");
//              setLoggedOut(false);
//              setUser({
//                  "name": name, 
//                  "workouts": [],
//              }); 
//          }
//          else {
//              setAdded("taken")
//          }
// function handleLogIn(e) {
//   e.preventDefault();
//   setInputID(e.target.value)
//   rescues.map(r => {
//     if (r.id === inputID) {
//       setRescue(r)
//       setLoggedOut(false)
//     }
//   })
// }
function handleLogIn(e) {
  e.preventDefault();
  setInputID(e.target.firstChild.nextSibling.value)
  rescues.map(r => {
    if (r.id === parseInt(inputID)) {
      setRescue(r)
      setLoggedOut(false)
    }
  })
}
   return (
    <div>
      My Animal Rescue App
      <form className="login" onSubmit={handleLogIn} style={{display: loggedOut ? 'visible' : 'none' }}> 
                Rescue ID:  
                <input 
                type="text" 
                id="inputname" 
                placeholder="Enter Rescue ID"
                onChange={(e) => setInputID(e.target.value)}></input>  
                <button>Enter</button>
            </form>
            {/* <form className="newRescue" onSubmit={handleSubmit} style={{display: loggedOut ? 'visible' : 'none' }}>
                Add New Rescue:  
                <input 
                type="text"
                name="rescuename"
                placeholder="Enter Rescue Name"
                onChange={handleAdd}
                ></input>                
                <button>Enter</button> 
            </form>  */}
            {rescue ? <Rescue rescue={rescue} /> : null}
      {/* <ul>
      {rescues.map((r) => (
        <li key={r.id} onClick={handleClick}>{r.name}</li>
        )) } 
      </ul>
      {submitted === true ? (
      <Rescue rescue={rescue} />
      ) : null }  */}
    </div>
   );

  //  function handleSubmit() {
  //    rescues.map(r => {
  //     if (r.id === id) {
  //       setSubmitted(true)
  //       setRescue(r)
  //     }
  //    })
  //  }
  //  function addNewRescue(e) {
     //newRescue = input Obj
    //post request to add to rescues db 
    //setRescues([...rescues, newRescue])
  //  }
  //  function showRescues(e) {
    //in html button, onClick, setShowAll to true
    //in html, form w/ check boxes
    //if e.target.value checked, filter
    //for rescue list item, on name click brings up RescueCard
  //  }

  //   return (
  //   <div className="App">
  //     <form className="rescueId" onSubmit={handleSubmit}>
  //       Rescue ID
  //       <input 
  //       type="text"
  //       name="id"
  //       value={body}
  //       onChange={(e) => setId(e.target.value)}
  //       />
  //       <button type="submit">
  //         Enter 
  //       </button>
  //     </form>
  //     {submitted === true ? (
  //     <Rescue>
  //        rescue={rescue}
  //     </Rescue>
  //      ) : null }
  //    <div>Add a New Rescue
  //      <form>Add</form>
  //    </div>
  //    <div>Find a Rescue
  //      <form>Filter By:</form>
  //    </div>
  //   </div>
  // );
}

export default App;
