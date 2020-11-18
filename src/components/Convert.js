import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Speech from 'react-speech'; 

import keys from '../config/keys';

const Convert = ({ language, text }) => {
	const [translated, setTranslated] = useState('');
	const [debouncedText, setDebouncedText] = useState(text);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedText(text);
		}, 500);

		return () => {
			clearTimeout(timerId);
		};

	}, [text]);

	useEffect(() => {
		const doTranslation = async () => {
			const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
				params: {
					q: text,
					target: language.value,
					key: keys.GOOGLE_API
				}
			});

			setTranslated(data.data.translations[0].translatedText);
		};

	doTranslation();
	
	}, [language, debouncedText]);

	return(
		
		<div>
			<h1 className="converted" style={{color: '#fafafa'}}>{translated}</h1> 

		{translated && 
		<div>
			<Speech 
				text={translated}
				pitch="0.1"
				rate="0.1"
				lang="en-GB"
			/>
			<p style={{fontWeight: 900, color: '#fafafa'}}>play</p>
		</div>
		}
		
		</div>
	);	
};

export default Convert;