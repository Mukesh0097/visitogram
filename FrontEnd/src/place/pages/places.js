import React,{useContext} from "react";
import { useHistory } from 'react-router-dom';
import Button from '../../shared/component/FromElement/Button'
import Input from '../../shared/component/FromElement/Input';
import ErrorModal from "../../shared/component/ErrorModal";
import LoadingSpinner from "../../shared/component/LoadingSpinner";
import ImagePicker from "../../shared/component/FromElement/imagepicker";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validation';
import {useForm} from "../../shared/hook/form-hook"
import { useHttpsClient } from "../../shared/hook/http-hook";
import AuthContext from "../../shared/context/auth-context";
import './placeForm.css'



const Places = () =>{

    const auth  = useContext(AuthContext);

    const {isLoading,error,sendRequest,clearError} = useHttpsClient();
   
    const [formState,inputHandler] = useForm(
        {
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false

        },
        address:{
            value:'',
            isValid:false
        },
        image:{
            value:null,
            isValid:false
        }
    },false)

    const history = useHistory();
   

    

    // console.log(!formState.isValid)
    const placeSubmitHandler = async (event)=>{
        event.preventDefault();
        try{
            const formData = new FormData();
            formData.append('title',formState.inputs.title.value)
            formData.append('description',formState.inputs.description.value)
            formData.append('address',formState.inputs.address.value)
            formData.append('creator',auth.userID)
            formData.append('image',formState.inputs.image.value)
            await  sendRequest("http://localhost:5000/api/places",'POST',
            formData,{
                Authorization:'Bearer ' + auth.token
            })
            history.push('/');
        }catch(err){}
       

        
    }

    return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay/>}
    <Input 
    id='title'
    label='Title' 
    element = "input" 
    validators={[VALIDATOR_REQUIRE()]} 
    errortext='please enter valid title'
    onInput = {inputHandler}
    />
    <ImagePicker center id="image" onInput={inputHandler} errortext="please provide image"/>
    <Input  
    id='description'
    label='Description' 
    element = "textArea" 
    validators={[VALIDATOR_MINLENGTH(5)]} 
    errortext='please enter at least 5 character!'
    onInput = {inputHandler}
    />

    <Input  
    id='address'
    label='Address' 
    element = "input" 
    validators={[VALIDATOR_REQUIRE()]} 
    errortext='Error plz enter valid Addreess !'
    onInput = {inputHandler}
    />
    <Button type="submit" disabled ={!formState.isValid} >ADD</Button>
    </form>
    </React.Fragment>
    )
}

export default Places;