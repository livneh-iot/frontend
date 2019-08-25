import React from 'react';
import { Icon, Button } from 'antd';

import { withFirebase } from '../Firebase';

const LogoutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut}>
   <Icon type="logout"/>
  </Button>
);

export default withFirebase(LogoutButton);
