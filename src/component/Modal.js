import React from 'react'
import './CssPhone.css'
import $ from 'stringee/jquery'
import {  StringeeCall, remoteVideo } from 'stringee/stringee'
class Modal extends React.Component {   
    constructor (props) {
        super(props)
        this.state = {
            fromNumber: '842473030635'
        }
        localStorage.setItem("access_token", "access_token_here")
    }
  

    testMakeCall() {
        let { stringeeClient } = this.props
        let { fromNumber } = this.state
        let call = new StringeeCall(stringeeClient, fromNumber, $('#callTo').val(), {})
        this.settingCallEvents(call)
        call.makeCall(function (res) {
            if (res.r !== 0) {
                $('#callStatus').html(res.message)
            }
        })
    }

    settingCallEvents(call1) {
        call1.on('addlocalstream', function (stream) {
        })

        call1.on('addremotestream', function (stream) {
                // reset srcObject to work around minor bugs in Chrome and Edge.
                remoteVideo.srcObject = null
                remoteVideo.srcObject = stream
            })

        call1.on('signalingstate', function (state) {
            console.log('signalingstate ', state)
            if (state.code == 6) {
                $('#incoming-call-div').hide()
            }
            var reason = state.reason
            $('#callStatus').html(reason)
        })

        call1.on('mediastate', function (state) {
            console.log('mediastate ', state)
        })

        call1.on('info', function (info) {
            console.log('on info', info)
        })

        call1.on('otherdevice', function (data) {
            console.log('on otherdevice:' + JSON.stringify(data))

            if ((data.type === 'CALL_STATE' && data.code >= 200) || data.type === 'CALL_END') {
                $('#incoming-call-div').hide()
            }
        })
    }

    testAnswerCall() {
        let call
        call.answer(function (res) {
            console.log('answer res', res)
            $('#incoming-call-div').hide()
        })
    }

    testRejectCall() {
        let call
        call.reject(function (res) {
            console.log('reject res', res)
            $('#incoming-call-div').hide()
        })
    }

    testHangupCall() {
        let call
        remoteVideo.srcObject = null

        call.hangup(function (res) {
            console.log('hangup res', res)
        })
    }

    //các nút sự kiện cho modal

    close() {
        var modal = document.getElementById("modal")
        modal.style.display="none"
    }

    closeOut() {
        var modal = document.getElementById("modal")
        modal.style.display="none"
    }

    render() {
    
        let { settingCallEvents } = this.state
        return(
    
            <div className="container">
                <div id="modal" className="modal">
                    <div className="modal-content"> 
                        <span className="close" onClick={()=>this.close()}>esc</span>
                        <h2>WELCOM TO NEXBUS</h2>
                        <div>
                            <input id="callTo" placeholder="nhập số điện thoại" type="text" name="call" />
                        </div>
                        <br />
                        <div>
                            <button id="call" className="button" onClick={() => this.testMakeCall()}>   
                                <span className="textFont">Call</span>
                            </button>
                            <button id="hangupBtn">Hangup</button>
                        </div>
                        <div id="incoming-call-div">
                            Incoming call from: <span id="incoming_call_from"></span>
                            <button id="answerBtn" >Answer</button>
                            <button id="rejectBtn">Reject</button>
                        </div>
    
                        <div>
                            <br/>
                            Call status: <span id="callStatus" >Not started</span>
                        </div>
                    </div>
                
                </div>
    
    
    
    
            </div>
        )
    }
}

export default Modal