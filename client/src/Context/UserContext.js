import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
export const UserContext = React.createContext();

export class UserProvider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    username: '',
    password: '',
    confirmPassword: ''
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }
  handleSignUp = async () => {
    try{
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/users',
        data: {
          name: this.state.username.toLowerCase(),
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }
      })
      return response;
    } catch (error) {
      throw error;
    }
  };

  handleSignIn = async () => {
    try{
      const response = await axios({
        method: 'get',
        url: 'http://localhost:5000/api/users',
        auth: {
          username: this.state.username.toLowerCase(),
          password: this.state.password
        }
      })
      this.setState({
        authenticatedUser: response.data.user,
        username: '',
        password: ''
      });
      Cookies.set('authenticatedUser', JSON.stringify(response.data.user), {expires: 1});
      return response;
    } catch (error) {
      throw error;
    }
  };
  handleSignOut = () => {
    this.setState({
      authenticatedUser: null
    });
    Cookies.remove('authenticatedUser')
  }
  render(){
    return(
      <UserContext.Provider value={{
        ...this.state,
        actions: {
          handleChange: this.handleChange,
          handleSignUp: this.handleSignUp,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut
        }
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
};

export function withUserContext(Component) {
  return function ContextComponent(props) {
    return (
      <UserContext.Consumer>
        {value => <Component {...props} context={value} />}
      </UserContext.Consumer>
    );
  }
}
