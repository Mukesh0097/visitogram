import React, { useState,useContext } from 'react';

import Card from '../../shared/component/Card';
import Input from '../../shared/component/FromElement/Input';
import Button from '../../shared/component/FromElement/Button';
import ErrorModal from '../../shared/component/ErrorModal';
import LoadingSpinner from '../../shared/component/LoadingSpinner';
import ImagePicker from '../../shared/component/FromElement/imagepicker';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validation.js';
import { useForm } from '../../shared/hook/form-hook';
import {useHttpsClient} from '../../shared/hook/http-hook.js'
import './auth.css';
import AuthContext from '../../shared/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading ,error, sendRequest , clearError} = useHttpsClient();
  

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    
    
    if(isLoginMode){
      try{
        const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL+"/users/login",
        'POST',
        JSON.stringify({
          email:formState.inputs.email.value,
          password:formState.inputs.password.value}),
        {
          'Content-Type':'application/json',
        }
        );
       auth.login(responseData.userId,responseData.token);

      }catch(err){ 
        
      }

    }
    else
    {
      try{
        const formData = new FormData();
        formData.append('name',formState.inputs.name.value)
        formData.append('email',formState.inputs.email.value)
        formData.append('password',formState.inputs.password.value)
        formData.append('image',formState.inputs.image.value)
       const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+"/users/signUp",
        'POST',
        formData
        )
        auth.login(responseData.userId,responseData.token);

      }catch(err){
        
      }    
    }
  };
 
  return (
    <React.Fragment>
    <ErrorModal error = {error} onClear = {clearError}/> 
    <Card className="authentication">
    {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && <ImagePicker center id="image" onInput={inputHandler}/>}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
    </React.Fragment>
  );
};

export default Auth;