import React from 'react';
// ícones do fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BottomTab = () => {
    return (
        <div className="fixed bottom-0 w-full bg-gray-800 h-16 flex justify-around items-center z-50">
            <Link to="/" className="text-white">
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link to="/login" className="text-white">
                <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link to="/config" className="text-white">
                <FontAwesomeIcon icon={faCog} />
            </Link>
        </div>
    );
}

export default BottomTab;
