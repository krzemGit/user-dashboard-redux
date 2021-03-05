import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import UserNavbar from './components/Navbar';
import UsersTable from './components/UsersTable';
import SideForm from './components/SideForm';
// custom alert
import UserAlert from './components/UserAlert'
import Footer from './components/Footer';

function App() {

  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <Container fluid>

      <UserNavbar setEditing={setEditing} />

      <Container className="pt-5">

        <div className="main">
          {message ? <UserAlert message={message} turnOff={setMessage} className="main__alert fading" /> : null}
          <h1 className="main__title">users list</h1>
        </div>

        <UsersTable
          setMessage={setMessage}
          setEditing={setEditing} />

      </Container>

      <SideForm
        user={editing}
        setEditing={setEditing}
        title={editing > 0 ? 'Edit User' : 'Add User'}
      />

      <Footer />

    </Container>
  );
}

export default App;
