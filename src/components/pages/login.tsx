import '../../styles/form.styles';
import { useStyles } from '../../styles/form.styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../utils/routes';
import { AuthService } from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import { resetUser, setUser } from '../../store/user/user.slice';

const LoginComponent = () => {

    const classes = useStyles();
    // const user: UserState = useSelector((state: UserState) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, reset, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data: FieldValues) => {
        console.log(data);
        // dispatch({
        //     type: 'setUser',
        //     payload: data
        // });
        if (data.username === 'user@email.com' && data.password === 'user') {
            AuthService.signIn();
            // dispatch({
            //     type: 'loginSuccess',
            //     payload: 'Login Successful'
            // });

            //reduxjs Toolkit apppoach
            dispatch(setUser(data));
            navigate(`${AppRoutes.HOME}`);
        }
        else if(data.username === 'admin@email.com' && data.password === 'admin') {
            AuthService.signIn();
            // dispatch({
            //     type: 'loginSuccess',
            //     payload: 'Login Successful'
            // });

            //reduxjs Toolkit apppoach
            dispatch(setUser({...data, isAdmin: true}));
            navigate(`${AppRoutes.HOME}`);
        } 
        else {
            // dispatch({
            //     type: 'loginFailed',
            //     payload: 'Incorrect username or password'
            // });

            //reduxjs Toolkit apppoach
            dispatch(resetUser({}));
        }
    };


    const handleFormReset = (e: Event) => {
        e.preventDefault();

    };

    const isLoginDisabled = (): boolean => {
        return Object.keys(errors).length > 0 ? true : false
    }

    return (
        <Card className={classes.card}>
            {/* <CardHeader className={classes.header} title="Login App" /> */}
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("username", {
                            required: true
                        })}
                        fullWidth
                        id="username"
                        type="email"
                        label="Username"
                        placeholder="Username"
                        margin="normal"
                    />
                    <TextField
                        {...register("password", {
                            required: true
                        })}
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        margin="normal"
                    />
                </form>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.loginBtn}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoginDisabled()}>
                    Login
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    color="default"
                    className={classes.resetBtn}
                    onClick={() => reset()}>
                    Reset
                </Button>
            </CardActions>
        </Card>
    )
}

export default LoginComponent