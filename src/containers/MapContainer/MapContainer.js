import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as UserActions } from '../../stores/ducks/users';
import Map from '../../components/Map';

const MapContainer = props => (
    <Map users={props.users} addUser={props.addUserRequest} removeUser={props.removeUserRequest}/>
);

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)