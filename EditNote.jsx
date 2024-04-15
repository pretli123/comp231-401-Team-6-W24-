import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
// this component is used to edit an note
function EditNote(props) {
  //
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  //
  const [note, setNote] = useState({ _id: '', title: '', 
  content: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/notes/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setNote(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateNote = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: note.title, content: note.content};
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        navigate('/shownote/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateNote}>
          <Form.Group>
            <Form.Label> Title</Form.Label>
            <Form.Control type="text" name="title" id="title" placeholder="Enter note title" value={note.title} onChange={onChange} />
            </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="content" id="content" placeholder="Enter note content" value={note.content} onChange={onChange} />
          </Form.Group>
          
          
        
          <Button variant="primary" type="submit">
            Update Note
          </Button>
        </Form>
    </div>
  );
}
//
export default EditNote;
