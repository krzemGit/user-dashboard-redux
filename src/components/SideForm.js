import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, createUser } from '../actions';
// Custom alert
import UserAlert from './UserAlert';

const url = process.env.REACT_APP_URL;

const SideForm = ({ title, user, setEditing }) => {

  // oepn/close class
  const isOpen = Number.isInteger(user) ? 'open' : '';

  // redux hooks
  const dispatch = useDispatch();
  const editedUser = useSelector(state => state.users.find(usr => usr.id === user));

  // form hooks
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);


  // fetching funtions
  const addUser = () => {
    axios.post(url, {
      name,
      username,
      address: { city },
      email
    })
      .then(res => {
        const user = {
          id: res.data.id,
          name: res.data.name || '',
          username: res.data.username || '',
          address: { city: res.data.address.city || '' },
          email: res.data.email || ''
        };
        dispatch(createUser(user));
        clearUser();
        setMsg({ type: 'warning', text: 'User successfully created!' });
      })
      .catch(err => {
        console.error(err);
        setMsg({ type: 'danger', text: 'Filed to add user!' });
      });
  };

  const editUser = (id) => {
    axios.put(url + `/${id}`, {
      name,
      username,
      address: { city },
      email
    })
      .then(res => {
        const user = {
          id: res.data.id,
          name: res.data.name || '',
          username: res.data.username || '',
          address: { city: res.data.address.city || '' },
          email: res.data.email || ''
        }
        setMsg({ type: 'warning', text: 'User successfully updated!' });
        dispatch(updateUser(user));
      })
      .catch(err => {
        console.error(err);
        setMsg({ type: 'danger', text: 'Failed to update user!' })
      });
  };

  const editLocalUser = () => {
    try {
      const user = {
        id: editedUser?.id,
        name,
        username,
        address: { city },
        email,
      };
      setMsg({ type: 'warning', text: 'User successfully updated!' });
      dispatch(updateUser(user));
    } catch (err) {
      console.error(err);
      setMsg({ type: 'danger', text: 'Failed to update user!' });
    };
  };


  // FORM HANDLERS
  const clearUser = useCallback(() => {
    setName('');
    setUsername('');
    setCity('');
    setEmail('');
    setMsg(null);
  }, []);

  const displayUser = useCallback(() => {
    setName(editedUser.name);
    setUsername(editedUser.username);
    setCity(editedUser.address.city);
    setEmail(editedUser.email);
  }, [editedUser]);

  // validation
  const formValid = () => {
    if (name.length && username.length && city.length && email.length) {
      return true;
    } else {
      setMsg({ type: 'danger', text: 'Cannot submit form with empty fields' });
      return false;
    };
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg(null);
    if (formValid()) {
      if (user === -1) {
        addUser();
      } else if (user > 0 && user <= 10) {
        editUser(user);
      } else {
        // for users from beyond JSON placeholder original list
        editLocalUser(user);
      };
    };
  };


  // useEffect
  useEffect(() => {
    editedUser ? displayUser(editedUser) : clearUser();
  }, [editedUser, displayUser, clearUser]);


  return (
    <section className={`side__menu ${isOpen}`}>
      <Container style={{ padding: '20px 30px', minWidth: 300 }}>
        {msg ? <UserAlert message={msg} turnOff={setMsg} className="fading side__alert text-center" /> : null}
        <FontAwesomeIcon
          icon={faTimes}
          className="icon__form"
          onClick={() => setEditing(null)}
        />
        <h2 className="my-5">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="icon__user mr-3"
          />
          {title}
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter name"
              autoComplete="false"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter username"
              autoComplete="false"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="outline-light" type="submit" className="mt-3">
            Submit
        </Button>
        </Form>
      </Container>
    </section>
  );
};

SideForm.defaultProps = {
  title: 'New User'
};

export default SideForm;