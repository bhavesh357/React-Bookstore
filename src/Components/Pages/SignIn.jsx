import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Snackbar,
} from "@material-ui/core";
import validation from "../../Service/validation";
import { signIn } from "./../../Redux/Actions/authActions";
import { showSnackbar, hideSnackbar } from "./../../Redux/Actions/snackbarActions";
import { connect } from "react-redux";
let Validate = new validation();

export class SignIn extends React.Component {
  state = {
    emailInvalid: false,
    passwordInvalid: false,
    email: "",
    password: "",
  };

  handleSignIn = () => {
    let patterns = Validate.getRegexs();
    let emailStatus = Validate.validateInput(this.state.email, patterns.email);
    let passwordStatus = Validate.validateInput(
      this.state.password,
      patterns.password
    );
    this.setState({
      emailInvalid: emailStatus,
      passwordInvalid: passwordStatus,
    });
    if (!emailStatus && !passwordStatus) {
      let user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signIn(user, () => {
        if (this.props.authError !== null) {
          this.props.showSnackbar(this.props.authError);
        }
      });
    }
  };

  handleSnackbarClose = () => {
    this.props.hideSnackbar();
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    if(this.props.auth.uid){
      return <Redirect to='/dashboard' />
    }

    return (
      <Grid container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.props.snackbar.snackbarStatus}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
          message={this.props.snackbar.snackbarMessage}
        />
        <Grid item md={4} />
        <Grid item container md={4}>
          <Card className="card">
            <CardContent className="card-content">
              <Grid item md={1}></Grid>
              <Grid item md={10} xs={10}>
                <Typography variant="h4">Sign in</Typography>
                <Typography className="page-subtitle">
                  Continue to Bookstore
                </Typography>
                <TextField
                  id="sign-in-email"
                  onChange={this.handleEmail}
                  value={this.state.email}
                  className="sign-input"
                  label="Email"
                  variant="outlined"
                  error={this.state.emailInvalid}
                  helperText={
                    this.state.emailInvalid ? "Enter Proper Email Id" : ""
                  }
                />
                <TextField
                  id="sign-in-password"
                  onChange={this.handlePassword}
                  value={this.state.password}
                  className="sign-input"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={this.state.passwordInvalid}
                />
                <CardActions className="sign-buttons">
                  <div className="sign-links">
                    <Link to={"/signup"} className="sign-link">
                      Sign Up Instead
                    </Link>
                  </div>
                  <Button
                    onClick={this.handleSignIn}
                    variant="contained"
                    color="primary"
                    className="sign-links-button"
                  >
                    Sign in
                  </Button>
                </CardActions>
              </Grid>
              <Grid item md={1}></Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    snackbar: state.snackbar,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds,callback) => dispatch(signIn(creds,callback)),
    showSnackbar: (message) => dispatch(showSnackbar(message)),
    hideSnackbar: () => dispatch(hideSnackbar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
