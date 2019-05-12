import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "mapbox-gl/dist/mapbox-gl.css";

import Modal from '../../components/Modal';
import UsersList from '../../components/UsersList';

class Map extends Component {
    state = {
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: -23.5439948,
            longitude: -46.6065452,
            zoom: 14
        },
        showModal: false,
        userInputValue: '',
        userLongitude: 0,
        userLatitude: 0
    };

    componentDidMount() {
        window.addEventListener("resize", this._resize);
        this._resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._resize);
    }

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    };

    handleMapClick = (e) => {
        const [longitude, latitude] = e.lngLat;

        this.setState({ showModal: true, userLongitude: longitude, userLatitude: latitude })
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    handleAddUser = () => {
        this.props.addUser(this.state.userInputValue, {
            latitude: this.state.userLatitude,
            longitude: this.state.userLongitude
        });
        this.setState({
            userInputValue: '',
            latitude: 0,
            longitude: 0,
            showModal: false
        });
    };

    handleInputChange = (e) => (
        this.setState({ userInputValue: e.target.value })
    );

    handleRemoveUser = (user) => (
        this.props.removeUser(user.id)
    );

    render() {
        return (
            process.env.REACT_APP_MAP_API_TOKEN ? <Fragment>
                <UsersList users={this.props.users} removeUser={this.handleRemoveUser} />
                <ToastContainer />
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="add user modal"
                    handleInputChange={this.handleInputChange}
                    handleAddUser={this.handleAddUser}
                >
                </Modal>
                <MapGL
                    {...this.state.viewport}
                    onClick={this.state.showModal ? null : this.handleMapClick}
                    mapStyle="mapbox://styles/mapbox/basic-v9"
                    mapboxApiAccessToken={
                        process.env.REACT_APP_MAP_API_TOKEN
                    }
                    onViewportChange={viewport => this.setState({ viewport })}
                    disabled={true}
                >
                    {this.props.users.length > 0 &&
                        this.props.users.map(user => {
                            return (<Marker
                                latitude={user.latitude}
                                longitude={user.longitude}
                                onClick={this.handleMapClick}
                                captureClick={true}
                                key={user.id}
                            >
                                <img
                                    style={{
                                        borderRadius: 100,
                                        width: 48,
                                        height: 48
                                    }}
                                    src={user.avatar}
                                    alt={user.name}
                                />
                            </Marker>)
                        })
                        }
                </MapGL>
            </Fragment> : <p>Missing API TOKEN</p>
        );
    }
}

export default Map;