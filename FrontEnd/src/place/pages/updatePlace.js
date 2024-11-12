import React,{useEffect,useState,useContext} from "react";
import { useParams,useHistory } from "react-router-dom";
import {useHttpsClient} from '../../shared/hook/http-hook'
import {useForm} from '../../shared/hook/form-hook'

import LoadingSpinner from "../../shared/component/LoadingSpinner";
import Input from '../../shared/component/FromElement/Input'
import Button from '../../shared/component/FromElement/Button'
import ErrorModal from "../../shared/component/ErrorModal";
import Card from '../../shared/component/Card'
import AuthContext from "../../shared/context/auth-context";
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from  "../../shared/util/validation"


import './placeForm.css'


const Updateplace = () =>{
    const [loadedPlace,setloadedPlaces] = useState();
    const {isLoading ,error,sendRequest,clearError} = useHttpsClient();
    const auth = useContext(AuthContext);
    
   
    const  { placeid } = useParams();
    const history = useHistory();



 

    // if(!identifier){
    //     return (
    //         <div className="centre">
    //            <h2>could not find place</h2> 
    //         </div>
    //     )
    // }

 const [formState,InputHandler,setFormData]  = useForm({
        title:{value:'',
            isValid:false

        },
        description:{
            value:'',
            isValid:false
        }
    },true)

    useEffect(()=>{ 
        const fetchPlaceData = async ()=>{
            try{
                const requestPlaceData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeid}`);
                
                setloadedPlaces(requestPlaceData.place)
                
                    setFormData({
                        title:{
                            value:requestPlaceData.place.title,
                            isValid:true
                
                        },
                        description:{
                            value:requestPlaceData.place.description,
                            isValid:true
                        }
                    },true)
            }catch(err){}
           };
           fetchPlaceData();
        },[sendRequest,placeid,setFormData])

   

    const UpdateSubmitHandler = async (event)=>{
        event.preventDefault();
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeid}`,'PATCH',JSON.stringify({
                title:formState.inputs.title.value,
                description:formState.inputs.description.value
            }),
            {
                'Content-Type':'application/json',
                Authorization:'Bearer '+ auth.token
            }
            )
            history.push('/'+auth.userID + '/places')

            

        }catch(err){

        }
    }

    if(isLoading){
        return(
            <div className="center">
                <LoadingSpinner asOverlay/>
            </div>
        )
    }


    if(!loadedPlace && !error){
        return(
            <div className="center">
                <Card>
                <h2>Could not find place</h2>
                </Card>
            </div>
        )
    }

    
    

    return <React.Fragment> 
    <ErrorModal error ={error} onClear= {clearError}/>
    {!isLoading && loadedPlace &&(<form className="place-form" onSubmit={ UpdateSubmitHandler}>
        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]}
        errortext='please enter valid title'
        onInput={InputHandler}
        Initialvalue={loadedPlace.title} 
        Initialvalid={true} />

        <Input id="description" element="textarea" type="text" label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
        errortext='please enter a valid description (minLength:5)'
        onInput={InputHandler}
        Initialvalue={loadedPlace.description} 
        Initialvalid={true}    
        />
        <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>


    </form>)}
    </React.Fragment>
}

export default Updateplace;