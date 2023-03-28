import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerComponent from '../../UIkit/Container.Component';

function ProfilePageComponent() {
    const dispatch = useDispatch();
    const userStore = useSelector((store) => store.userStore.user);
    return (
        <ContainerComponent>
            <div className='profilePage-wrapper d-flex justify-content-center m-5'>
                <ul className='user-profile border p-5' style={{listStyle: 'none'}}>                    
                    <li>First Name: { userStore.firstName}</li>
                    <li>Last Name: { userStore.lastName}</li>
                    <li>Email: { userStore.email}</li>
                    <li>Address: { userStore.address}</li>
                    <li>Is Active: { userStore.isActive? "Yes" : 'No'}</li>
                    <li>Id: { userStore._id}</li>
                </ul>
            </div>
        </ContainerComponent>
    );
}

export default ProfilePageComponent;