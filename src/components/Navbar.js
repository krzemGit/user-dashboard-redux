import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faUserCircle } from '@fortawesome/free-solid-svg-icons';


const UserNavbar = ({ setEditing }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="icon__logo mr-3"
        />
        User Manager App
      </Navbar.Brand>
      <FontAwesomeIcon icon={faAngleDoubleRight} className="icon__form" onClick={() => setEditing(-1)} />
    </Navbar>
  );
};

export default UserNavbar;