import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';
import { Mic } from './Mic';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const options = [
			{
				label: 'Zulu',
				value: 'zu'
			}, 
			{
				label: 'Afrikaans',
				value: 'af'
			}, {
				label: 'English',
				value: 'en'
			}
			 ];

const Translate = () => {
	const [language, setLanguage] = useState(options[0]);
	const [text, setText] = useState('');
	const [recording, isRecording] = useState(false);
	const { transcript, resetTranscript } = useSpeechRecognition();
	const [timerID, setID ] = useState(null);

	useEffect(() => {
		clearInterval(timerID);
		setText(transcript);
	 }, [transcript]);

	 useEffect(() => {
		const id = setTimeout(() => {
			isRecording(false);
		}, 3000);
		setID(id);
	 }, [text]);

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return (
			<h1 style={{margin: '1em auto', color: '#fafafa', textAlign: 'left'}}>Not supported on this browser/ device. We are working hard to ensure that all devices and browsers are catered for, the application is in early stages of development and will have more support in due time. </h1>
		);
	}

	const onMicClick = (e) => {
		e.preventDefault();

		if(!recording) { 
			isRecording(true);
			SpeechRecognition.startListening();
		 } else {
			SpeechRecognition.stopListening();
			isRecording(false);
		 }
	}

	return (
			<div style={{textAlign: 'center'}}>
				<div style={{width: '30vw', margin: '4em auto'}}>
					{
						recording ? <div id="loader" className="ui active centered massive inline loader"></div>
						:
						<div>
							<a href="#" onClick={(e) => onMicClick(e)}><i id="mic" className="ui icon large microphone" style={{color: '#fafafa'}}></i></a>
						</div>
					}
					{/* <a href="#" onClick={resetTranscript}><i class="undo black icon"></i></a> */}
				</div>
				
				<div className="ui form" style={{margin: '2em auto', width: window.innerWidth < 400 ? '90vw' : '50vw'}}>
					<div className="field">
					<label className="label" style={{color: '#fafafa', textAlign: 'left'}}></label>
						<div class="ui input">
							<input placeholder="Click microphone to record or enter text here..." value={text} onChange={(e) => setText(e.target.value)} style={{border: 'none', borderBottom: '2.5px solid #fafafa', fontSize: '1.5em', backgroundColor: '#fafafa00'}}/>
						</div>
					</div>
				</div>
				{/* <Mic recording={recording} /> */}
				<Dropdown selected={language} onSelectedChange={setLanguage} options={options}/>
				<Convert text={text} language={language} />
			</div>);
};

export default Translate;