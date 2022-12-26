import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signin, signup} from '../../actions/auth';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); //to get console.log() in react.
        
       if(isSignup){
         dispatch(signup(formData, history));
       } else {
         dispatch(signin(formData, history));
       }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
           setIsSignup(!isSignup);
    }

    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
           // dispatch({ type: 'AUTH', data: {result,token}});

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try Again Later');
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name ="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" type={showPassword ? "text" : "password"} handleChange={handleChange}/>} 
                    <GoogleLogin/>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick = {switchMode}>
                                    {isSignup ? 'Already have an account ? Sign In' : `Don't have an account ? Sign Up`}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth