import React from "react";
import { SignUpPageController } from "./SignUpPageController";
import PersonAdd from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const signUpPageView = <P, S>(ctrl: SignUpPageController<P, S>, _props?: P): JSX.Element => (
    <div className="SignUpPageController">
        <form>
            <h2 className="text-center">
                Sign Up
            </h2>
            <PersonAdd key={10} className="avatar" />
            <div className="grid input-block">
                <div className="col-6 text-left link-block">
                    <Link to="/sign-in" component={RouterLink}>
                        Sign In
                    </Link>
                </div>
                <div className="col-6 text-right link-block">
                    <Link to="/restore" component={RouterLink}>
                        Restore
                    </Link>
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="login"
                        label="Login"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => null}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => null}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => null}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => null}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <FormControlLabel label={
                        <small>
                            I accept the Terms of Use
                        </small>
                    }
                        control={
                            <Checkbox name="remember"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => null}
                                color="primary" />
                        } />
                </div>
                <div className="col-12">
                    {
                        !ctrl.isProgress ?
                            (
                                <Button key={40}
                                    variant="contained"
                                    color="primary"
                                    disabled={!ctrl.login || !ctrl.password}
                                    onClick={() => ctrl.makeLogin()} >
                                    Sign Up
                                </Button>
                            ) :
                            (
                                <CircularProgress size={60} thickness={7} />
                            )
                    }
                </div>
            </div>
        </form>
    </div>
);
