import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Student from './Student'


const api = 'http://localhost:3333/api/students'

class App extends Component {
  state = {
    newstudent: '',
    students: []
  }

  componentDidMount() {
    axios.get(api)
    .then(response => {
      this.setState({ students: response.data });
    });

    // fetch(api).then(result => {
    //   return result.json()
    // }).then(student => {
    //   this.setState({ students: [...this.state.students, student] })
    // })
  }

  changeStudent = (e) => {
    this.setState({ newstudent: e.target.value });
  }

  addStudent = (e) => {
    e.preventDefault();
    axios.post(api, { studentname: this.state.newstudent })
    .then(response => {
      this.setState({ newstudent: '', students: [...this.state.students, response.data] })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Students</h1>
        </header>

        <div>
          { this.state.students.map(student => {
          return (
            <Student key={ student.id } name={ student.name } />
          )
        }) }
        </div>

        <form onSubmit={this.addStudent}>
          <label htmlFor="studentname">New Student:</label>
          <input id="studentname" value={this.state.newstudent} onChange={ this.changeStudent } />
          <button type="submit">Add!</button>
        </form>
        <p>{ this.state.newstudent }</p>
      </div>
    );
  }
}

export default App;
