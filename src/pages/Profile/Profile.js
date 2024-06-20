import React from 'react'
import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import './profile.css'

function Profile() {
    const { user } = useContext(AuthContext);
    const displayName = user.email.split("@")[0]
    return (
        <div className='profile-container'>
            <div className='profile-header'>Your Profile</div>

            <div className="profile-box">

                <div className="profile-image-container">
                    <img
                        src={`https://robohash.org/${displayName}12.png?set=set4&size=100x100`}
                        alt="kitten"
                        className="profile-image"
                    />
                </div>
                <div className="profile-details">
                    <div className="profile-username">Username: {displayName}</div>
                    <div className="profile-email" style={{marginTop:"10px"}}>Email: {user.email}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile
