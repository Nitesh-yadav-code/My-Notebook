import React from 'react'

export default function NoteItem(props) {
    const { title, description, tag } = props.note;
    return (
        <div className="col-md-3 ">
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href="#" className="btn btn-sm btn-primary">{tag}</a>
                    </div>
            </div>
        </div>
    )
}
