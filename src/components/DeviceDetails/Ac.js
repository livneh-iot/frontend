import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Button } from 'antd/lib/radio';

class Ac extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            device: null,
            deviceState: null
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
        this.props.firebase.deviceState(deviceId).on('value', snapshot => {
            const deviceData = snapshot.val();

            this.setState({
                deviceState: deviceData,
                loading: false,
            });
        });

    }
    componentWillUnmount() {
        this.props.firebase.device(this.props.deviceId).off();
        this.props.firebase.deviceState(this.props.deviceId).off();
    }
    _togglePower() {
        const { deviceState } = this.state;
        const power = deviceState.powerState?0:1;
        const newState = { ...deviceState, powerState: power };
        this.setState({
            deviceState: newState
        })
        this.props.firebase.deviceState(this.props.deviceId).set(newState);
    }
    render() {
        const { device, deviceState } = this.state;
        return (
            deviceState ? <div>
                <Button onClick={() => this._togglePower()} > {deviceState.powerState ? 'On' : 'Off'}</Button >
            </div > : null


        )
    }
}

export default withFirebase(Ac);