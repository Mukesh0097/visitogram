import React,{ useState,useContext } from "react";
import { useHttpsClient } from "../../shared/hook/http-hook";
import Card from "../../shared/component/Card";
import Button from "../../shared/component/FromElement/Button";
import Modal from "../../shared/component/modal";
import ErrorModal from "../../shared/component/ErrorModal";
import LoadingSpinner from "../../shared/component/LoadingSpinner";
import Map from "../../shared/component/map";
import AuthContext from "../../shared/context/auth-context";
import './userPlaceItem.css'




const UserPlaceItem = (props)=>{
    const {isLoading,error,sendRequest,clearError} = useHttpsClient();
    const auth = useContext(AuthContext);
    const [showmap,setShowMap] = useState(false);
    const [showConfirmModal,setShowConfirmModal] = useState(false);
    

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHnadler=() =>{
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () =>{
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () =>{
        setShowConfirmModal(false);
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,'DELETE',null,{
                
                Authorization:'Bearer '+ auth.token
            })
            props.onDelete(props.id);
            
        }catch(err){

        }
    }

   
    return (
        <React.Fragment>
        <ErrorModal error = {error} onClear = {clearError}/>
        <Modal show ={showmap} 
        onCancel = {closeMapHandler} 
        heading= {props.address}
        contentClass ='place-item__modal-content' 
        footerClass ='place-item__modal-actions'
        footer ={<Button onClick={closeMapHandler}>CLOSE</Button>} >
        <div className="map-container">
            <Map center={props.locations} zoom={16} />
        </div>
        </Modal>
        <Modal 
        show ={showConfirmModal}
        onCancel = {cancelDeleteHandler}
        heading='Are you sure?' footerClass='place-item__modal-actions'
        footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button inverse onClick={confirmDeleteHandler}>DELETE</Button>
            </React.Fragment>
        }>
        <p>Do you want to proceeed and delete this place ? Please note that it can't be undone thereafter.</p>
        </Modal>
        <li className="place-item">
            <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
                <div className="place-item__image">
                    <img src = {`${process.env.REACT_APP_ASSET_URL}/${props.Image}`} alt={props.title}/>
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <p>{props.address}</p>
                    <p>{props.cordinates}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>view on map</Button>
                    { auth.userID === props.creatorId  &&
                        <Button to ={`/places/${props.id}`}>EDIT</Button>
                    }
                    { auth.userID === props.creatorId  &&
                        <Button danger onClick={showDeleteWarningHnadler}>Delete</Button>
                    }
                    
                </div>
 
            </Card>
        </li>
        </React.Fragment>
    )

}

export default UserPlaceItem ;