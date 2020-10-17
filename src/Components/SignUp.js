import React from 'react';
import APIKit from '../APIKit';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
  } from 'react-native';
import './popupStyles.css';
class SignUp extends React.Component{
    state = {
        username: '',
        password: '',
        confirmedPassword: '',
        address: ''
    }
    componentDidMount(){
        this.setState({address: this.props.accounts[0]})
    }
    onUsernameChange = username => {
        this.setState({username});
    };
    onPasswordChange = password => {
        this.setState({password});
    };
    onConfirmedPasswordChange = confirmedPassword => {
        this.setState({confirmedPassword});
    };
    onPressSignUp(){
        if (this.state.password===this.state.confirmedPassword){
            const {username, password, address} = this.state;
            const payload = {username, password, address}
            APIKit.post('/users/add',payload,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=>{
                console.log(res)
            })
            .catch(err=>console.log(err))
        }
        else
            alert("Please re-enter the same password.")
        
    }
    render(){
        return(
            <div>
                {this.props.popup?<div className='popup'>
                    <div className='popup_inner'>
                        <button type="button" className="btn btn-info" onClick={this.props.closePopup}>X</button><br/><br/>
                        Sign up here!
                        <View style={styles.containerStyle}>
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
                            <TextInput
                                style={styles.input}
                                value={this.state.password}
                                maxLength={256}
                                placeholder="Enter password..."
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                blurOnSubmit
                                onSubmitEditing={this.onPressSignUp.bind(this)}
                                onChangeText={this.onPasswordChange}
                                secureTextEntry
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
                            <TextInput
                                style={styles.input}
                                value={this.state.confirmedPassword}
                                maxLength={256}
                                placeholder="Re-enter password..."
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                blurOnSubmit
                                onSubmitEditing={this.onPressSignUp.bind(this)}
                                onChangeText={this.onConfirmedPasswordChange}
                                secureTextEntry
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
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
                                onPress={this.onPressSignUp.bind(this)}>
                                <Text style={styles.loginButtonText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </div>
                </div>:null}
            </div>
        )
    }
}

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

export default SignUp