import React, { useState } from "react";

function AnimalCard({ rescue, animal, setAnimal }) {
    const [updatedAnimal, setUpdatedAnimal] = useState({})
    const [clicked, setClicked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    let newName = "";
    let newSex = "";
    let newColor = "";
    let animalUpdate = {name: animal.name, sex: animal.sex, color: animal.color}

   function handleUpdate(e){
       e.preventDefault();
       setClicked(true)
   }
   function handleDelete(e){
     e.preventDefault();
       let id = e.target.parentElement.id
       //delete request to animal/id
   }
   function handleSubmitUpdate(e){
       e.preventDefault();
       if (newSex !== "") {
           animalUpdate.sex = newSex
       }
       else {
           animalUpdate.sex = animal.sex
       }
       if (newColor !== "") {
          animalUpdate.color = newColor;
       }
       else {
        animalUpdate.color = animal.color
      }
       if (newName !== "") {
           animalUpdate.name = newName
       }
       else {
        animalUpdate.color = animal.color
      }
      setUpdatedAnimal(animalUpdate);
      setClicked(false)
      fetch(`http://localhost:9292/rescue/${rescue.id}/animals/${animal.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(animalUpdate)
      })
      .then((r) => r.json())
      .then((patchedAnimal) => setAnimal(patchedAnimal))

 }
   function handleEdit(e){
       e.preventDefault();

       if (e.target.name === "name") {
           newName = e.target.value;
       }
       if (e.target.name === "sex") {
           newSex = e.target.value;
       }
       if (e.target.name === "color") {
           newColor = e.target.value;
       }
   }
return (
        <div>
            <ul key={animal.id}>{animal.name}
                <li>{animal.sex}</li>
                <li>{animal.color}</li>
                <button key="update" onClick={handleUpdate}>update</button>
                <button key="delete" onClick={handleDelete}>delete</button>
            </ul>
            { clicked ? <form onSubmit={handleSubmitUpdate}>
                <input name="name" defaultValue={animal.name} onChange={handleEdit}/> 
                <input name="sex" defaultValue={animal.sex} onChange={handleEdit}/> 
                <input name="color" defaultValue={animal.color} onChange={handleEdit} />
                <button>Submit</button>
            </form>
            : null }
        </div>
)
}
export default AnimalCard; 
