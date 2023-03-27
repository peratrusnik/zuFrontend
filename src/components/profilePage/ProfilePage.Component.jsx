import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerComponent from '../../UIkit/Container.Component';

function ProfilePageComponent() {
    const dispatch = useDispatch();
    const userStore = useSelector((store) => store.userStore.user);
    return (
        <ContainerComponent>
            <div className='profilePage-wrapper d-flex justify-content-center'>
                <ul className='user-profile border col-8'>

                    
                    <li>{ userStore.firstName}</li>
                    <li>{ userStore.lastName}</li>
                    <li>{ userStore.email}</li>
                </ul>
            </div>
        </ContainerComponent>
    );
}

export default ProfilePageComponent;