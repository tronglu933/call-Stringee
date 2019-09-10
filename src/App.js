import React from 'react'
import './App.css'
import IconPhone from './component/IconPhone'
import Modal from './component/Modal'
import $ from 'stringee/jquery'
import socket from 'stringee/socket.io-2.2.0'
import {
  StringeeClient,
} from 'stringee/stringee'

window.io = socket

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stringeeClient: new StringeeClient()
    }
  }

  componentDidMount() {
    let { stringeeClient } = this.state
    this.settingClientEvents(stringeeClient)
    stringeeClient.connect(localStorage.getItem("access_token"))
  }

  settingClientEvents = (client) => {
    client.on('connect', function () {
      debugger
      console.log('connected to StringeeServesr')
    })
    client.on('authen', function (res) {
      console.log('authen: ', res)
      $('#loggedUserId').html(res.userId)
    })
    client.on('disconnect', function () {
      console.log('disconnected')
    })
    client.on('incomingcall', function (incomingcall) {
      let call = incomingcall
      this.props.settingCallEvents(incomingcall)
      $('#incoming-call-div').show()
      $('#incoming_call_from').html(call.this.state.fromNumber)
      console.log('incomingcall: ', incomingcall)
    })
    client.on('requestnewtoken', function () {
      console.log('request new token please get new access_token from YourServer and call client.connect(new_access_token)')
      //please get new access_token from YourServer and call: 
      //client.connect(new_access_token)
      // SET TIMEOUT
    })
    client.on('otherdeviceauthen', function (data) {
      console.log('otherdeviceauthen: ', data)
    })
  }

  render() {
    let { stringeeClient } = this.state
    return (
      <div>
        <IconPhone
          id="clickIcon"
          image="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png"
        />
        <Modal id="modal" stringeeClient={stringeeClient} />
      </div>
    )

  }
}
export default App
