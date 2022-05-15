import React, { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";

function Animals({ rescue }) {
    const [animal, setAnimal] = useState({})
    const [add, setAdd] = useState(false)
    const [newAnimal, setNewAnimal] = useState({})
    //option to filter by sex, kind, breed, age, longest to newest

   function handleClick(e){
       e.preventDefault(); 
       rescue.animals.map(a => {
           if (a.name === e.target.innerText) {
               setAnimal(a);
           }
       })
   }
   function handleAdd(e) {
       e.preventDefault();
       setAdd(true);
   }
   function handleSubmit(e) {
       e.preventDefault();
       let newName = e.target.firstChild.value;
       let newSex = e.target.firstChild.nextSibling.value;
       let newColor = e.target.firstChild.nextSibling.nextSibling.value;
      setNewAnimal({name: newName, sex: newSex, color: newColor}) 
      //post request
   }

return (
        <div>
            <p>Current Animals</p>
            {rescue.animals.map(a => <li key={a.id} onClick={handleClick}>{a.name} </li>)}
            {animal.id === undefined ? null : <AnimalCard animal={animal} setAnimal={setAnimal} /> }
            <button onClick={handleAdd}>Add New Animal</button>
            { add ? <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name"/>
                <input name="sex" placeholder="Sex"/>
                <input name="color" placeholder="Color"/>
                <button>Submit</button>
            </form> : null }
        </div>
)
}
export default Animals; 
