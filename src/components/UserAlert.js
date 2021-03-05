import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';


const UserAlert = ({ message, turnOff, className }) => {

  useEffect(() => {
    const id = setTimeout(() => turnOff(null), 3000);

    return () => clearTimeout(id);
  }, [turnOff])

  return (
    <Alert variant={message.type} className={className} >
      {message.text}
    </Alert>
  );
};

export default UserAlert;