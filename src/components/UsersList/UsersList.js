import React from 'react';
import './UserList.css';

const UsersList = ({ users, removeUser }) => (
    <div id="user-list-container">
        <ul className="user-list">
            {users.map(user => (
                <li className="user-item" key={user.id}>
                    <img src={user.avatar} alt={user.name} className="user-image"/>
                    <div className="user-info">
                        <strong>{user.name}</strong>
                        <small>{user.login}</small>
                    </div>
                    <button className="user-remove" onClick={() => removeUser(user)}>Delete</button>
                </li>

            ))}
        </ul>
    </div>
);

export default UsersList;