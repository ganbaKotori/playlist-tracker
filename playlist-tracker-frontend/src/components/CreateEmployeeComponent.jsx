

import React, { Component} from 'react'
import EmployeeService from '../services/EmployeeService'

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);

    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log(employee)
        EmployeeService.createEmployee(employee).then(res => {
            
        })
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});

    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});

    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});

    }

    render(){
        return(
            <div>
                <h2>Add employee</h2>

                <form onSubmit={this.saveEmployee}>
                <label>
              First Name:
              <input
                type="text"
                value={this.state.firstName}
                onChange={this.changeFirstNameHandler}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={this.state.lastName}
                onChange={this.changeLastNameHandler}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={this.state.emailId}
                onChange={this.changeEmailIdHandler}
              />
            </label>
            <input type="submit" value="Submit" />

                </form>       

            </div>
        )
    }
}


export default CreateEmployeeComponent