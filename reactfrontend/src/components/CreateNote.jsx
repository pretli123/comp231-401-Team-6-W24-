import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNote.css';
// this component is used to create a new note


function CreateNote(props) {
    //
    let navigate = useNavigate();
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [note, setNote] = useState({ _id: '', title: '', content: '', username: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "api/api/notes"
    //
    const saveNote = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {title: note.title, content: note.content, username: username };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save Note:',result.data)
            navigate('/shownote/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();   

        setNote({...note, [e.target.name]: e.target.value});

      }
    
      return (
        <div className="create-note-container">
          <h2>Create a Note {username}</h2>
          {showLoading && (
            <Spinner className="create-note-spinner" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Form className="create-note-form" onSubmit={saveNote}>
            <Form.Group>
              <Form.Label className="create-note-label">Title</Form.Label>
              <Form.Control
                className="create-note-input"
                type="text"
                name="title"
                id="title"
                placeholder="Enter title"
                value={note.title}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="create-note-label">Content</Form.Label>
              <Form.Control
                className="create-note-textarea"
                as="textarea"
                rows="3"
                name="content"
                id="content"
                placeholder="Enter Note"
                value={note.content}
                onChange={onChange}
              />
            </Form.Group>
            <Button className="create-note-button" variant="primary" type="submit">
              Save Note
            </Button>
          </Form>
        </div>
      );


}
// 
export default CreateNote;
