import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
export const Context = React.createContext();

export class Provider extends Component {
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
          name: this.state.username,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }
      })
      console.log(response)
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
          username: this.state.username,
          password: this.state.password
        }
      })
      console.log(response)
      this.setState({
        authenticatedUser: response.data.user
      });
      Cookies.set('authenticatedUser', JSON.stringify(response.data.user), {expires: 1});
      return response;
    } catch (error) {
      throw error;
    }
  };
  render(){
    console.log(this.state)
    return(
      <Context.Provider value={{
        ...this.state,
        actions: {
          handleChange: this.handleChange,
          handleSignUp: this.handleSignUp,
          handleSignIn: this.handleSignIn
        }
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
};

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {value => <Component {...props} context={value} />}
      </Context.Consumer>
    );
  }
}
