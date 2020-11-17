import React from 'react'
import { ReactMic } from 'react-mic';
 
export class Mic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }
  }

//   componentDidMount() {
//     this.startRecording();
//   }
 
  startRecording = () => {
    this.setState({ record: true });
  }
 
  stopRecording = () => {
    this.setState({ record: false });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
 
  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#fafafa"
          backgroundColor="rgba(0,147,255,0)" />
        <div >
            {/* <button onClick={this.startRecording} type="button">Start</button>
            <button onClick={this.stopRecording} type="button">Stop</button>
            <button onClick={this.state.record ? this.stopRecording : this.startRecording} type="button"><i className={`ui icon ${!this.state.record ? 'circle' : 'circle outline'}`} ></i></button> */}
        </div>
      </div>
    );
  }
}