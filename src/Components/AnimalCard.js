import React, { useState } from "react";

function AnimalCard({ animals, animal, setAnimal }) {
    const [updatedAnimal, setUpdatedAnimal] = useState({})
    const [clickedUpdate, setClickedUpdate] = useState(false)
    let animalUpdate = animal 

   function handleUpdateAnimal(e){
       e.preventDefault();
       setClickedUpdate(true)
   }
   function handleDeleteAnimal(e){
     e.preventDefault();
        fetch(`http://localhost:9292/animals/${animal.id}`, {
          method: "DELETE",
        })
          .then((r) => r.json())
          .then((deletedAnimal) => console.log(deletedAnimal));
   }
   function handleSubmitUpdateAnimal(e){
      e.preventDefault();
      setClickedUpdate(false)
      fetch(`http://localhost:9292/animals/${animal.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
             updatedAnimal,
          }),
      })
      .then((r) => r.json())
      .then((patchedAnimal) => setAnimal(patchedAnimal))
 }
   function handleEdit(e){
       e.preventDefault();
       if (e.target.name === "name") {
        animalUpdate.name = e.target.value;
       }
       if (e.target.name === "sex") {
        animalUpdate.sex = e.target.value;
       }
       if (e.target.name === "color") {
        animalUpdate.color = e.target.value;
       }
        setUpdatedAnimal(animalUpdate);
   }
return (
        <div>
            <ul key={animal.id}>{animal.name}
                <li>{animal.sex}</li>
                <li>{animal.color}</li>
                <button key="update" onClick={handleUpdateAnimal}>update</button>
                <button key="delete" onClick={handleDeleteAnimal}>delete</button>
            </ul>
            { clickedUpdate ? <form onSubmit={handleSubmitUpdateAnimal}>
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
