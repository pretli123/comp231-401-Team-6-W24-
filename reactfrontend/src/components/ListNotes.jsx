// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Spinner from 'react-bootstrap/Spinner';
// import Login from './Login';
// import { useNavigate } from 'react-router-dom';
// //
// // this component is used to list all Notes
// function ListNotes(props) {
//   let navigate = useNavigate();
//   //
//   const [data, setData] = useState([]);
//   const [showLoading, setShowLoading] = useState(true);
//   const apiUrl = "api/api/notes";

//   useEffect(() => {
//     const fetchData = async () => {
//       axios.get(apiUrl)
//         .then(result => {
//           console.log('result.data:',result.data)
//           //check if the user has logged in
//           //if(result.data.screen !== 'auth')
//           //{
            
//             console.log('data in if:', result.data )
//             setData(result.data);
//             setShowLoading(false);
//           //}
//         }).catch((error) => {
//           console.log('error in fetchData:', error)
//         });
//       };  
//     fetchData();
//   }, []);

//   const showDetail = (id) => {
//     navigate( '/shownote/' + id);
    
//   }


//   return (
//     <div>
//       { data.length !== 0
//         ? <div>
//           {showLoading && <Spinner animation="border" role="status">
//             <span className="sr-only">Loading...</span>
//           </Spinner> }
//           <ListGroup>
//             {data.map((item, idx) => (
//               <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.title}</ListGroup.Item>
//             ))}
//           </ListGroup>
//         </div>
//         : < Login />
//       }
//     </div>

//   );
// }

// export default ListNotes;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function ListNotes(props) {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/api/notes";

  const checkAuthentication = async () => {
    try {
      const res = await axios.get('/api/check_authentication'); // Assuming you have an endpoint for checking authentication
      if (res.data.authenticated) {
        fetchData(); // Fetch notes if authenticated
      } else {
        setShowLoading(false);
      }
    } catch (error) {
      console.log('Error checking authentication:', error);
      setShowLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(apiUrl);
      setData(result.data);
      setShowLoading(false);
    } catch (error) {
      console.log('Error fetching notes:', error);
      setShowLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const showDetail = (id) => {
    navigate('/shownotes/' + id);
  };

  return (
    <div>
      {data.length !== 0 ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => showDetail(item._id)}>
                {item.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default ListNotes;
