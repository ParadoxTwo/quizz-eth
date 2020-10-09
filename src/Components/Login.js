import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';
import APIKit from '../APIKit'
import SignUp from './SignUp'

const setClientToken = token => {
    APIKit.interceptors.request.use(function(config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
};

const initialState = {
  username: '',
  password: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
  popup: false
};

class Login extends Component {
  state = initialState;

  componentWillUnmount() {}

  onUsernameChange = username => {
    this.setState({username});
  };

  onPasswordChange = password => {
    this.setState({password});
  };


  onPressLogin() {
    const {username, password, address} = this.state;

    const onSuccess = ({data}) => {
      // Set JSON Web Token on success
      console.log(data)
      if(data[0].password==password&&data[0].address==this.props.accounts[0]){
        console.log("pass "+password)
        this.props.loginUser(username);
        setClientToken(data.token);
        this.setState({isLoading: false, isAuthorized: true});
      }
      else{
          alert("Incorrect Username/pass/address")
      }
    };

    const onFailure = error => {
      console.log(error && error.response);
      this.setState({errors: error.response.data, isLoading: false});
    };

    // Show spinner when call is made
    this.setState({isLoading: true});

    APIKit.get('/users/login/'+username)
      .then(onSuccess)
      .catch(onFailure);
  }

  onPressSignUp(){
    this.setState({popup: true});
  }

  getNonFieldErrorMessage() {
    // Return errors that are served in `non_field_errors`
    let message = null;
    const {errors} = this.state;
    if (errors.non_field_errors) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {errors.non_field_errors.map(item => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

  getErrorMessageByField(field) {
    // Checks for error message in specified field
    // Shows error message from backend
    let message = null;
    if (this.state.errors[field]) {
      message = (
        <View style={styles.errorMessageContainerStyle}>
          {this.state.errors[field].map(item => (
            <Text style={styles.errorMessageTextStyle} key={item}>
              {item}
            </Text>
          ))}
        </View>
      );
    }
    return message;
  }

  render() {
    const {isLoading} = this.state;

    return (
    <div>
        {this.state.popup?<SignUp accounts = {this.props.accounts} closePopup={()=>this.setState({popup:false})} popup={this.state.popup}/>:null}
        <View style={styles.containerStyle}>
        {/* <Spinner visible={isLoading} /> */}

        {!this.state.isAuthorized ? <View>
          <TextInput
            style={styles.input}
            value={this.state.username}
            maxLength={256}
            placeholder="Enter username..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.onUsernameChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          {this.getErrorMessageByField('username')}

          <TextInput
            ref={node => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.password}
            maxLength={40}
            placeholder="Enter password..."
            onChangeText={this.onPasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={this.onPressLogin.bind(this)}
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          {this.getErrorMessageByField('password')}

          {this.getNonFieldErrorMessage()}
          <TextInput
            style={styles.input}
            value={this.props.accounts[0]}
            maxLength={256}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={event =>
              this.passwordInput.wrappedInstance.focus()
            }
            editable={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onPressLogin.bind(this)}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSignUp.bind(this)}>
              <Text>Sign Up</Text>
          </TouchableOpacity>
        </View> : <View><Text>Successfully authorized!</Text></View>}
      </View>
    </div>
    );
  }
}

// Define some colors and default sane values
const utils = {
  colors: {primaryColor: '#af0e66'},
  dimensions: {defaultPadding: 12},
  fonts: {largeFontSize: 18, mediumFontSize: 16, smallFontSize: 12},
};

// Define styles here
const styles = {
  innerContainer: {
    marginBottom: 32,
  },
  logotypeContainer: {
    alignItems: 'center',
  },
  logotype: {
    maxWidth: 280,
    maxHeight: 100,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },
  input: {
    height: 50,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: utils.dimensions.defaultPadding,
  },
  loginButton: {
    borderColor: utils.colors.primaryColor,
    borderWidth: 2,
    padding: utils.dimensions.defaultPadding,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  loginButtonText: {
    color: utils.colors.primaryColor,
    fontSize: utils.fonts.mediumFontSize,
    fontWeight: 'bold',
  },
  errorMessageContainerStyle: {
    marginBottom: 8,
    backgroundColor: '#fee8e6',
    padding: 8,
    borderRadius: 4,
  },
  errorMessageTextStyle: {
    color: '#db2828',
    textAlign: 'center',
    fontSize: 12,
  },
};

export default Login;