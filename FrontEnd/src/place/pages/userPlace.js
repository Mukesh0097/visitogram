import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useHttpsClient } from "../../shared/hook/http-hook";
import UserPlaceList from "../component/userPlaceList";
import ErrorModal from "../../shared/component/ErrorModal";
import LoadingSpinner from "../../shared/component/LoadingSpinner";







const Userplaces = () =>{
    const [loadedPlaceData ,setloadedplaceData] = useState();
    const {isLoading ,error,sendRequest,clearError} = useHttpsClient();
    
   
    const userId = useParams().userId;
    
    useEffect(()=>{
        
        const fetchRequest = async ()=>{
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setloadedplaceData(responseData.places);
            }catch(err){}
           
        };
        fetchRequest()
    },[sendRequest,userId])

    const deleteHandler = (deleteId) =>{
        setloadedplaceData(prevPlaces =>
            prevPlaces.filter(place => place.id !== deleteId))

    }
   
    
    return (<React.Fragment>
    <ErrorModal error={error} onClear = {clearError} />
    { isLoading && (<div className="center"><LoadingSpinner asOverlay/></div>)}
    {!isLoading && loadedPlaceData && <UserPlaceList place = {loadedPlaceData} onDeleteplace = {deleteHandler}/>}
    </React.Fragment>
    )
    
}

export default Userplaces;