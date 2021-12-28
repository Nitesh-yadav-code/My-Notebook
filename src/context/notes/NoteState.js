import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setnotes] = useState(notesInitial)

   // Get all Note
   const getNotes= async()=>{
    // Api call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjMmNhNzBkZGM1YWRhYWFjMTlmYWU4In0sImlhdCI6MTY0MDIzODY4OH0.VhxYObxtuqJyCp3n7GsjKwAu5gGcN4zEuaAT2cQja-Y'
      },
    });
    const json =  await response.json();
     console.log(json);
     setnotes(json);
 }

  // Add a Note
  const addNote= async(title, description, tag)=>{
     // Api call
     const url = `${host}/api/notes/addnote`;
     const response = await fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjMmNhNzBkZGM1YWRhYWFjMTlmYWU4In0sImlhdCI6MTY0MDIzODY4OH0.VhxYObxtuqJyCp3n7GsjKwAu5gGcN4zEuaAT2cQja-Y'
       },
       body: JSON.stringify({title, description, tag}) 
     });
     const json =  response.json();
    console.log("Note Added" ,json);
    const note={
      "_id": "61c7f7548638674176da14f6",
          "user": "61c2ca70ddc5adaaac19fae7",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-12-26T05:02:12.958Z",
          "__v": 0
    };
    setnotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote= async(id)=>{
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjMmNhNzBkZGM1YWRhYWFjMTlmYWU4In0sImlhdCI6MTY0MDIzODY4OH0.VhxYObxtuqJyCp3n7GsjKwAu5gGcN4zEuaAT2cQja-Y'
      },
    });
    const json =  response.json();
    console.log(json);
    console.log("Deleting Note with" + id);
    const newNote =  notes.filter((note)=>{ return note._id !== id})
    setnotes(newNote);
  }
  // Edit a Note
  const editNote= async(id, title, description, tag)=>{
    console.log( "This is note id",id);
    // Api call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjMmNhNzBkZGM1YWRhYWFjMTlmYWU4In0sImlhdCI6MTY0MDIzODY4OH0.VhxYObxtuqJyCp3n7GsjKwAu5gGcN4zEuaAT2cQja-Y'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        element.title = title;
        element.description= description;
        element.tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  }
  
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;