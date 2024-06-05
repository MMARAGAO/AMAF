import React from 'react';
// ícones do fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BottomTab = () => {
    return (
        <div className='flex justify-center items-center px-10 fixed bottom-0 w-full py-10'>
            <div className="w-full h-10 bg-gray-500 opacity-70 rounded-full flex justify-between px-10 items-center">
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
        </div>
    );
}

export default BottomTab;
