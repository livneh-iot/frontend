import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class Boiler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            device: null
        }
    }

    componentWillMount() {
        this.setState({ loading: true });
        const { deviceId } = this.props;
        this.props.firebase.device(deviceId).on('value', snapshot => {
            const deviceData = snapshot.val();

            this.setState({
                device: deviceData,
                loading: false,
            });
        });
    }
    componentWillUnmount() {
        this.props.firebase.device(this.props.deviceId).off();
    }

    render() {
        const device = this.state.device || {};
        const { loading } = this.state.loading;
        return (
            <div>

            </div>
        )
    }
}

export default withFirebase(Boiler);