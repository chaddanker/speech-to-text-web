import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({options, selected, onSelectedChange, label}) => {

	const [visible, setVisible] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const onBodyClick = (e) => {
			if(ref.current.contains(e.target)) return; //allows us to check if one DOM element is conatained by another
			setVisible(false);
		};

		document.body.addEventListener('click', onBodyClick);

		return () => {
			document.body.removeEventListener('click', onBodyClick);
		};
	}, []);

	const renderedOptions = options.map((option => {
		if(option.value === selected.value){
			return null; //means dont render anything
		}else{
			return (
				<div 
				key={option.value} 
				className="item"
				onClick={() => {onSelectedChange(option)}}
				>
					{option.label}
				</div>
			);
		}
	}));
	return (
		<div 
			ref={ref} 
			className="ui form" 
			style={{
				margin: '2em 0', 
				marginTop: 0, 
				fontSize: '1.1em', 
				fontWeight: 900
		}}>
			<div className="field">
				<label 
					className="label" 
					style={{
						color: '#fafafa', 
						textAlign: 'left', 
						marginLeft: '18.75em'
				}}>
					{label}
				</label>
				<div 
					onClick={() => setVisible(!visible)} 
					className={`ui selection dropdown ${visible ? 'visible active' : ''}`} 
					style={{
						border: 'none', 
						width: window.innerWidth < 400 ? '90vw' : '50vw', 
						backgroundColor: '#f0f0f0'
					}}>
					<i className="dropdown icon"></i>
					<div className="text">
						{selected.label}
					</div>
					<div className={`menu ${visible ? 'visible transition' : ''}`} style={{border: 'none'}}>
						{renderedOptions}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;