import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const notesInitial = [
    
        {
          "_id": "61c58e55ae31c31d9f10c80f",
          "user": "61c2ca70ddc5adaaac19fae8",
          "title": "New Note3",
          "description": "This note is for JavaScript2",
          "tag": "Education",
          "date": "2021-12-24T09:09:41.296Z",
          "__v": 0
        },
        {
          "_id": "61c58f391e0d95d3ae4b001f",
          "user": "61c2ca70ddc5adaaac19fae8",
          "title": "My personal Note",
          "description": "This note is for JavaScript2",
          "tag": "Education",
          "date": "2021-12-24T09:13:29.438Z",
          "__v": 0
        },
        {
          "_id": "61c58fcc1a24c9f97a5f2559",
          "user": "61c2ca70ddc5adaaac19fae8",
          "title": "My personal Note 22",
          "description": "This note is for JavaScript2",
          "tag": "Education",
          "date": "2021-12-24T09:15:56.685Z",
          "__v": 0
        },
        {
          "_id": "61c5f5fef6024711fb995466",
          "user": "61c2ca70ddc5adaaac19fae8",
          "title": "My personal Note 22000",
          "description": "This note is for JavaScript2",
          "tag": "Education",
          "date": "2021-12-24T16:31:58.636Z",
          "__v": 0
        },
        {
          "_id": "61c7f7548638674176da14f0",
          "user": "61c2ca70ddc5adaaac19fae8",
          "title": "My personal Note 22000",
          "description": "This note is for JavaScript2",
          "tag": "Education",
          "date": "2021-12-26T05:02:12.958Z",
          "__v": 0
        }
      
  ]

  const [notes, setnotes] = useState(notesInitial)

  // Add a Note
  const addNote=(title, description, tag)=>{
    console.log("Note Added");
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
  const deleteNote=()=>{

  }
  // Edit a Note
  const editNote=()=>{

  }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;