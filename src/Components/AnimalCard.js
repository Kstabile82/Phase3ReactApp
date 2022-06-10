import React, { useState } from "react";

function AnimalCard({ animal, setAnimal, onDeleteAnimal, closedAnimal, setClosedAnimal }) {
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
          onDeleteAnimal(animal.id);
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
       if (e.target.name === "adopted") {
        animalUpdate.adoption_status = e.target.value;
       }
        setUpdatedAnimal(animalUpdate);
   }
   function handleCloseAnimal(e) {
    e.preventDefault(); 
    setClosedAnimal(true)
}
return (
        <div className="animalcard" style={{display: closedAnimal === true ? 'none' : 'visible' }}>
            <ul key={animal.id}>{animal.name}
                <div>{animal.sex}</div>
                <div>{animal.color}</div>
                {animal.adoption_status === true ? 
                <div>Adopted</div> 
                : <div>Adoptable</div>}
                <button key="update" onClick={handleUpdateAnimal}>update</button>
                <button key="delete" onClick={handleDeleteAnimal}>delete</button>
                <button onClick={handleCloseAnimal}>close</button>
            </ul>
            { clickedUpdate ? <form onSubmit={handleSubmitUpdateAnimal}>
                <input name="name" defaultValue={animal.name} onChange={handleEdit}/> 
                <input name="sex" defaultValue={animal.sex} onChange={handleEdit}/> 
                <input name="color" defaultValue={animal.color} onChange={handleEdit} />
                <select name="adopted" defaultValue={animal.adoption_status} onChange={handleEdit}>
                    <option value="" hidden>Adopted</option>
                     <option>Yes</option>
                     <option>No</option>
                </select>                
                <button>Submit</button>
            </form>
            : null }
        </div>
)
}
export default AnimalCard; 
