import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";

const Login = () => {
  const app = initializeApp(firebaseConfig);
  const location = useLocation();
  const page = location.pathname === "/login" ? true : false;
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setisEmailUsed] = useState(false);
  const [emailValid,setEmailValid] = useState(true);
  const [passwordValid,setPasswordValid] = useState(true);

  const validation = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };


  const onSignInClickHandler = (e) => {
    e.preventDefault();

    if(!validation('email', email) || !validation('password', password)){
      setEmailValid(validation('email', email));
      setPasswordValid(validation('password', password));
      return;
    }
    
    if (page) {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          setUserExist(true);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((error) => setisEmailUsed(true));
    }
  };

  useEffect(() => {
    setUserExist(false);
    setisEmailUsed(false);
  }, [location]);

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page ? "Sign In" : "Register"}</h1>
        <br />
        <form>
          <input
            className="form-control"
            type="email"
            value={email}
            placeholder="Email"
            onChange={emailOnChangeHandler}/>
         {!emailValid && <p className="text-danger">email is invalid/blank</p>}
          
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password" />
           {!passwordValid &&  <p className="text-danger">password is invalid/blank</p>}
         
          <button
            className="btn btn-danger btn-block"
            onClick={onSignInClickHandler}
          >
            {page ? "Sign In" : "Register"}
          </button>
          <br />
          {page && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              >
                Remember Me
              </label>
            </div>
          )}
        </form>
        <br />
        {isUserExist && <p className="text-danger">User does not exist</p>}
        {isEmailUsed && <p className="text-danger">Email already in use</p>}

        <div className="login-form-other">
          <div className="login-signup-now">
            {page ? "New to Netflix?  " : "Existing user  "}
            <Link className=" " to={page ? "/register" : "/login"}>
              {page ? "register" : "signup now"}
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;
