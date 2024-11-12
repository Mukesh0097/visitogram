import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/component/Avatar";
import Card from "../../shared/component/Card";

import './userItem.css'

const UserItem = (props) =>{
   
    return (
        <li className="user-item">
        
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>
                <div className="user-item__image">
                    <Avatar src={`${process.env.REACT_APP_ASSET_URL}/${props.Image}`} alt={props.name}  />
                </div>
                 <div className="user-item__info">
                    <h2 >{props.name}</h2>
                    <h3> {props.placeCount === 1 &&  props.placeCount === 0 ? 'place' : 'places'} {props.placeCount} </h3>
                </div>
                </Link>
                </Card>
      
        </li>
        
    );
   
};

export default UserItem;