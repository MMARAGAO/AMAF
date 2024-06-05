import React from "react";
// icones do fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Header = () => {

    return (
        <div className="flex h-16 justify-between items-center px-6  ">
            <h1 className="font-bold">AMAF</h1>
        </div>
    );
}

export default Header;
