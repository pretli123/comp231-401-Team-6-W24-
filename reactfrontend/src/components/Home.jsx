
import React, { Component }  from 'react';
//
// this is the home page component
function Home(props)
{


    return (
        <div>
            <h2> NoteSphere</h2>
            <p>Navigating the Chaos, Mastering the Order. Unleashing Productivity, Ensuring Deadlines Bow to Precision</p>
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;