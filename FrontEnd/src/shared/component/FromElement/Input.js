import React,{useReducer,useEffect} from "react";
import { validate } from '../../util/validation'

import './Input.css'
const inputValidation = (state , action) =>{
  switch(action.type){
    case 'CHANGE':
      return{
        ...state,
        value : action.val,
        isValid : validate(action.val , action.validators)
      };
      case'touch':
      return  {
        ...state,
        istouch :true
      }
      default:
        return state;

  }
  

}
const Input = props =>{
const [inputState,dispatch]  = useReducer(inputValidation,{value:props.Initialvalue||'',isValid :props.Initialvalid||false, istouch:false})
const {id,onInput} = props;
const {value,isValid} = inputState;  

useEffect(()=>{
  onInput(id,value,isValid)
},[value,isValid,id,onInput])


const changeHandler = event => {
  dispatch({type:'CHANGE', val:event.target.value, validators : props.validators});

}

const touchHandler = ()=>{
  dispatch({
    type:'touch'
  })
}


    const element = props.element === 'input'? <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchHandler}   value={inputState.value} />:<textarea id={props.id} rows={props.rows || 3}  onChange={changeHandler}  value={inputState.value} onBlur={touchHandler}/>
  
    return (
    <div className={`form-control ${!inputState.isValid && inputState.istouch && 'form-control--invalid'}`}>
        <label htmlFor={props.id} className={props.className}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.istouch  && <p>{props.errortext}</p>}
    </div>
 

);
} 

export default Input;