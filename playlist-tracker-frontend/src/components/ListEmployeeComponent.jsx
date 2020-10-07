import React, { Component} from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }
    }

    componentDidMount(){
        EmployeeService.getEmployees().then(res => {
            this.setState({employees: res.data})
        })
    }

    render(){
        return(
            <div>

                <h2>Employee List</h2>
                <ul >
                {
                    this.state.employees.map(employee => {
                        return(
                            <li key={employee.id}>{employee.id}, {employee.firstName}, {employee.lastName}</li>
                        )
                    
                    })
                }

                </ul>
        

            </div>
        )
    }
}


export default ListEmployeeComponent