import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post('http://localhost:3001/apps/notes', {
              title,
              content,
          });
  
          if (response.data === "exist") {
              alert('Note already created');
          } else if (response.data === "not exist") {
              navigate("/", { state: { id: content } });
              alert("You have created a note");
          }
  
          
      } catch (error) {
          alert('Error saving note');
          console.error(error);
      }
  };



    useEffect(()=> {
      document.title = "Create Notes"
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Create a Note</h3>

                <label>Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label>Content:</label>
                <textarea
                    rows="3"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />

                <br />
                <br />
                <button type="submit"className="btn btn-primary">Save Note</button>

                <br />
                <p>Want to create another note?</p>
                <p><a href="/createnote" className="nav-link">Create another note</a></p>
            </form>
        </div>
    );
};

export default CreateNote;