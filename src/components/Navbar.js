import React from 'react';
import './Navbar.css';

function App() {
    return (
        <div>
            <div className="container">
                <div className="App">
                    <div className="header-app">
                        <div className="logo">
                            <img src="/images/logos_firebase.png" alt="Firebase Logo" />
                        </div>
                        <div className="title">
                            <h1>Firebase Contact App</h1>
                        </div>
                    </div>
                    {/* <div className="input-container">
                        <div className="input-with-logo">
                            <img src="/images/input.png" alt="Input Logo" />
                            <input className='search-content' type="text" placeholder="Search Content" />
                        </div>
                        <div className="input-logo">
                            <img src="/images/Group 1.png" alt="Input Logo" className="small-input-logo" />
                        </div>
                    </div> */}
                </div>
            </div>

        </div>
    )
}
export default App;
