import React from "react";
import Card from "../../shared/component/Card";
import UserPlaceItem from "./userPlaceItem";
import Button from "../../shared/component/FromElement/Button";
import './userPlaceList'




const UserPlaceList = (props)=>{
    
    if(props.place.length === 0){
        return (<div className="place-list center">
            <Card>
                <h1>Data is not found may not created</h1>
                <Button to="/new/Places">sharePlace</Button>
            </Card>
            </div>
        )
    }


    return(
        <ul className="place-list">
            {props.place.map((user) => {
                return    <UserPlaceItem
                    key={user.id} 
                    id= {user.id} 
                    Image= {user.image}
                    title= {user.title}
                    address = {user.address}
                    description ={user.description}
                    creatorId = {user.creator}
                    locations={user.cordinates} 
                    onDelete = {props.onDeleteplace}
                    />
            })}
        </ul>
    )

}

export default UserPlaceList;