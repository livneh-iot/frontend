import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Card, Row, Col, Button } from 'antd';
import Boiler from './Boiler';
import Ac from './Ac';

class DeviceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            device: null
        }
    }
    componentWillMount() {
        this.setState({ loading: true });
        const { match: { params: { id: deviceId } } } = this.props;
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
    _isOnline(deviceTime) {
        return deviceTime && (Date.now() - deviceTime * 1000 < 30000);
    }
    _deviceDetailsSelector(device) {
        if (!device) {
            return null;
        }
        switch (device.deviceType) {
            case 'ac':
                return <Ac deviceId={device.deviceId}/>
            case 'boiler':
                return <Boiler deviceId={device.deviceId}/>
            default:
                return null;
        }
    }
    render() {
        const { loading } = this.state;
        const device = this.state.device || {};
        return (
            <Card
                loading={loading}
                title={device.name}
            >
                <div style={this._isOnline(device.currentTime) ? { border: "none" } : {
                    border: "dotted",
                    "borderWidth": "1px",
                    "borderColor": "red"
                }}>
                    {new Date(device.currentTime * 1000).toLocaleString()}
                </div>
                <div>
                    {this._deviceDetailsSelector(device)}
                </div>
            </Card>
        )
    }
}

export default withFirebase(DeviceDetails);
