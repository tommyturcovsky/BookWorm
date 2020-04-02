import React from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/bookList.css';

class Header extends React.Component {

    render() {
        return (
            <div className="">
                <div className="heading-container">
                    <h1 className="bookWorm-heading">BookWorm</h1>
                    <h4 className="bookWorm-subheading">A Book Tracking App</h4>
                </div>
            </div>
        );
    }

}
export default Header;