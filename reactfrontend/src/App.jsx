import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Header from './components/Header'; // Import the Header component

import EditNote from './components/EditNote';
import ShowNote from './components/ShowNote';
import ListNotes from "./components/ListNotes";
import CreateNote from "./components/CreateNote"

import Signup from './components/Signup';
import banner from './assets/banner.jpg';

import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        {/* Call the Header component */}
        <Header />
        <div className="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />         
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="createnote" element={<CreateNote />} />
            <Route path="shownote/:id" element={<ShowNote />} />
            <Route path="editnote/:id" element={<EditNote />} />
          </Routes>
        </div>
        <footer /> {/**this is the footer */}
      </div>
    </Router>
  )
}

export default App;












// import { useState } from 'react'
// import './App.css'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Routes
// } from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Container from 'react-bootstrap/Container';

// import EditNote from './components/EditNote';
// import ShowNote from './components/ShowNote';
// import ListNotes from "./components/ListNotes";
// import CreateNote from "./components/CreateNote"

// import Signup from './components/Signup';
// import banner from './assets/banner.jpg';

// import Home from './components/Home';
// import Login from './components/Login';

// function App() {
//   const [count, setCount] = useState(0)

//   return (

//     <Router>
//       <Navbar bg="primary" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand href="#home">NoteSphere</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mr-auto">
//               <Nav.Link as={Link} to="/home" >Home</Nav.Link>
//               <Nav.Link as={Link} to="/login">Login</Nav.Link>
//               <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
//               <Nav.Link as={Link} to="/createnote">Create Notes</Nav.Link>
              
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <div>
//         <Routes>
//           <Route index element={<Home />} />
//           <Route path="home" element={<Home />} />         
//           <Route path="signup" element ={< Signup />} />
//           <Route path="login" element= {< Login />}  />
//           <Route path="createnote" element= {< CreateNote />}  />
//           <Route path="shownote/:id" element= {< ShowNote />}  />
//           <Route path="editnote/:id" element= {< EditNote />}  />

//         </Routes>
//       </div>


//     </Router>
//   )
// }

// export default App
