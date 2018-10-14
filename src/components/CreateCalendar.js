import React, { Component } from 'react'

import 'react-day-picker/lib/style.css'
import { Link } from 'react-router-dom'
import api from './api'

class CreateCalendar extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      timeZone: 'Eastern Time',
      dlst: false,
      newCalendarId: '',
      msg: ''
    }
  }

  submitCalendar (e) {
    let { title, timeZone, dlts } = this.state
    let { id } = this.props
    e.preventDefault()
    if (id) {
      api.editCalendar(id, title, timeZone,
        dlts)
        .then(res => window.alert('Calendar Successfully Updated'))
    } else {
      api.createNewCalendar(title, timeZone)
        .then(res => {
          this.setState({ newCalendarId: res.id })
        })
    }
  }
  setTimeZone (e, value) {
    e.preventDefault()
    this.setState({ timeZone: value })
  }
  render () {
    let { newCalendarId } = this.state
    if (newCalendarId) {
      return (<div className='enclosingDiv'>
        <div className='calendarItem'>
          <label className='itemList1'><strong>New Calendar Title</strong><br /><div type='text' placeholder='New Calendar Title' onChange={e => this.setState({ title: e.target.value })}>{this.state.title}</div>
          </label>
          <Link to={`/Calendar/${newCalendarId}/AddEmployee`}><button className='titleButton'>Final Step</button></Link>
        </div>
      </div>)
    } else {
      return (<div className='enclosingDiv'>
        <div className='calendarItem'>
          <label className='itemList1'><strong>Create A Calendar</strong><br /><input className='formInput2' type='text' placeholder='New Calendar Title' onChange={e => this.setState({ title: e.target.value })} />
          </label>
          <div>
            <label className='itemList1'>Time Zone<div>
              <select className='timeSelector' placeholder='hours' onBlur={(e) => this.setTimeZone(e, e.target.value)}>
                <option className='selector'>--Select--</option>
                <option value='Eastern Time (US & Canada)'>Eastern Time (US & Canada)</option>
                <option value='Alaska'>Alaska</option>
                <option value='Hawaii'>Hawaii</option>
                <option value='Mountain Time (US & Canada)'>Mountain Time (US & Canada)</option>
                <option value='Central Time (US & Canada)'>Central Time (US & Canada)</option>
              </select>
            </div>
            </label><br />

            <div> <Link to={`/Calendar/${newCalendarId}/AddEmployee`}><button className='titleButton' to='/Calendar/:id/AddEmployee' onClick={e => { this.submitCalendar(e) }}>Create Calendar</button></Link>
            </div>
          </div>
        </div>
      </div>)
    }
  }
}
export default CreateCalendar
