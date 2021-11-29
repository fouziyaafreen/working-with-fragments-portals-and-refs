import React, { useState,useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";


const AddUser = (props) => {
  const nameRef=useRef();
  const ageRef=useRef();
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [errormessage, seterrormessage] = useState();

  const userChangeHandler = (event) => {
    setname(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setage(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameRef.current.value);
    console.log(ageRef.current.value);
    if (name.trim().length === 0 || age.trim().length === 0) {
      seterrormessage({
        title: "Invalid Input",
        message: "Please enter name and age(non-empty value)"
      });
    }
    else if (+age < 1) {
      seterrormessage({
        title: "Invalid Input",
        message: "Please enter age > 0"
      });
    }
    else{
      props.userDetails(name, age);
    }
    

    setname("");
    setage("");
  };
  const onerrorHandler=()=>{
    seterrormessage(null);
  };

  return (
    <React.Fragment>
      {errormessage && (
        <ErrorModal title={errormessage.title} message={errormessage.message} onconfirm={onerrorHandler}/>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            value={name}
            type="text"
            onChange={userChangeHandler}
            ref={nameRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={ageChangeHandler}
            ref={ageRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
