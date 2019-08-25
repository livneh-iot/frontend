import { List, Icon} from 'antd';
import React, { Component } from 'react'
import { compose } from 'recompose';

import { withAuthorization, AuthUserContext } from '../Session';
import Device from '../Device'

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const {authUser}  = this.props;
    this.props.firebase.devices(`${authUser.uid}`).on('value', snapshot => {
      const devicesData = snapshot.val();

      const devicesList = Object.keys(devicesData);

      this.setState({
        devices: devicesList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.devices().off();
  }

  render() {
    const { devices, loading } = this.state;

    return (
          <div>
            
          <List
            loading= {loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={devices}
            renderItem={item => (
              <List.Item>
                <Device deviceId={item}></Device>
              </List.Item>
            )}
          />
        </div>
    )
  }
}

const WithAuthContext = (Component) => {
  return (props) => (
      <AuthUserContext.Consumer>
           {authUser =>  <Component {...props} authUser={authUser} />}
      </AuthUserContext.Consumer>
  )
}


const condition = authUser => !!authUser;
export default compose(
  withAuthorization(condition),
  WithAuthContext
)(Devices);

