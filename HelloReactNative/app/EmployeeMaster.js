/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ListView
} from 'react-native';

import EmployeeDetail from './EmployeeDetail';
export default class EmployeeMaster extends Component {
	constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    };
  }
  
  componentDidMount(){
	  this.fetchUsers();
  }
  fetchUsers(){
	fetch('https://jsonplaceholder.typicode.com/users') 
		.then((response)=>response.json())
		.then((response)=> {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(response)
			});
		});
	} 
	  
  
  renderRow(user){
	  return(
	   <EmployeeDetail
	   id={user.id} name={user.name} email={user.email} phone={user.phone} city={user.address.city}
	   
	   >
	     </EmployeeDetail>
	   
	  )
  }
  render() {
    return (
      <View>
	       
		   <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
	   </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EmployeeMaster', () => EmployeeMaster);
