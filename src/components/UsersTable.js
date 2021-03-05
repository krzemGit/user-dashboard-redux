import React, { useCallback, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../actions';


const url = process.env.REACT_APP_URL;


const UsersTable = ({ setMessage, setEditing }) => {

  // hooks
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [dataFetched, setDataFetched] = useState(false);
  const [fetchError, setFetchError] = useState(false);


  // fetching function
  const fetchUsers = useCallback(async () => {

    try {
      setFetchError(false)
      const res = await axios.get(url)
      dispatch(getUsers(res.data))

    } catch (err) {
      setFetchError(true)
      console.error(err);
    }
  }, [setFetchError, dispatch]);


  // removing functions
  const removeUser = (id) => {
    axios.delete(url + `/${id}`)
      .then(res => {
        setMessage({ type: 'dark', text: `User number ${id} has been removed` });
        dispatch(deleteUser(id));
      })
      .catch(err => {
        console.error(err);
        setMessage({ type: 'dark', text: 'Failed to remove user' });
      });
  };

  const removeLocalUser = (id) => {
    try {
      dispatch(deleteUser(id));
      setMessage({ type: 'dark', text: `User number ${id} has been removed` });
    } catch (err) {
      setMessage({ type: 'dark', text: 'Failed to remove user' });
      console.error(err);
    };
  };

  const handleRemoveUser = (id) => {
    // condition necessary for removing users that are not included at the JSON placeholder API
    id > 0 && id < 10 ? removeUser(id) : removeLocalUser(id);
  };


  //useEffects
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    users.length && setDataFetched(true);
  }, [users, setDataFetched]);


  // table display variants
  let tableContent;
  if (fetchError) {
    tableContent = (
      <tr>
        <td colSpan={6} className="text-center">
          <Alert variant="warning" className="m-0">
            Failed to fetch users data!
          </Alert>
        </td>
      </tr>
    )
  } else if (!dataFetched) {
    tableContent = (
      <tr>
        <td colSpan={6} className="text-center"><Spinner animation="border" variant="light" /></td>
      </tr>
    )
  } else if (!users.length) {
    tableContent = (
      <tr>
        <td colSpan={6} className="text-center">
          <Alert variant="warning" className="m-0">
            No data to display!
          </Alert>
        </td>
      </tr>
    )
  } else {
    tableContent = users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.address.city}</td>
          <td>{user.email}</td>
          <td style={{ textAlign: 'center' }}>
            <Button
              size="sm"
              variant="outline-warning warning"
              onClick={() => handleRemoveUser(user.id)}
            >Remove</Button>
            <Button
              size="sm"
              variant="outline-light"
              className="ml-2"
              onClick={() => setEditing(user.id)}
            >Edit</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Table striped bordered hover responsive variant="dark" className="mt-5">
      <thead>
        <tr>
          <th>Id</th>
          <th style={{ minWidth: 205 }}>Name</th>
          <th>User Name</th>
          <th>City</th>
          <th>E-mail</th>
          <th style={{ textAlign: 'center', minWidth: 155 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableContent}
      </tbody>
    </Table>
  );
};

export default UsersTable;