import { Card, Row, Col, Icon } from 'antd';
import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

class Device extends Component {

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
    _isOnline(deviceTime) {
        return deviceTime && (Date.now() - deviceTime * 1000 < 30000);
    }
    render() {
        const device = this.state.device || {};
        const { loading } = this.state;
        return (
            <Card
                onClick={() => this.props.history.push(`${ROUTES.DEVICES}/${this.props.deviceId}`)}
                title={device.name}
                loading={loading}
                hoverable={true}
            >
                <div>
                    <Row>
                        <Col span={3}>Time:</Col>
                        <Col span={12}>
                            <div style={this._isOnline(device.currentTime) ? { border: "none" } : {
                                border: "dotted",
                                "borderWidth": "1px",
                                "borderColor": "red"
                            }}>
                                {new Date(device.currentTime * 1000).toLocaleString()}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>Type:</Col>
                        <Col span={12}>{device.deviceType}</Col>
                        <Col span={3}>Id:</Col>
                        <Col span={3}>{device.deviceId}</Col>
                    </Row>
                </div>
            </Card>
        )
    }
}

export default compose(withFirebase,withRouter)(Device);