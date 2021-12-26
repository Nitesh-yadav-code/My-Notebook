import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Note</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}
