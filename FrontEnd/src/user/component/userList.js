import React from 'react';

import Card from '../../shared/component/Card';
import UserItem from './userItem';
import './useList.css'

const UserList = (props) =>{
    

    if(props.items.length === 0){
        return(
            <Card>
            <h1>No User found</h1>
            </Card>
        );
    }

    return (
    <ul>
    {
        props.items.map(user => <UserItem key={user.key} id={user.id} Image={user.image} name ={user.name} placeCount = {user.places.length} />)
    }
    
    </ul>
        
    )
   

};

export default UserList;