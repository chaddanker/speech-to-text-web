import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('javascript');
	const [debouncedTerm, setDebouncedTerm] = useState(term);
	const [results, setResults] = useState([]);
	//useEffect helps us detect component is rerendering - something like life cycle methods

	//3 ways to configure useEffect

		//first rendered []
		//first and rendered ...nothing...
		//first and (rerendered and some piece of data has changed) [something]
		useEffect(() => {
			const timerId = setTimeout(() => {
				setDebouncedTerm(term);
			}, 500);

			return () => {
				clearTimeout(timerId);
			};

		}, [term]);

		useEffect(() => { //cannot mark this function as async with useEffect.
			const search = async () => {
				const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
					params: {
						action: 'query',
						list: 'search',
						origin: '*',
						format: 'json',
						srsearch: debouncedTerm
					},
				});
				setResults(data.query.search);
			}
			if(debouncedTerm !== ''){
				search();
			}
		}, [debouncedTerm]); //invoke first and every time after when TERM changes

		const renderedList = results.map((result) => {
			return(
				<div key={result.pageid} className="item">
					<div className="content">
						<div className="right floated content">
							<a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">go</a>
						</div>
						<div className="header">
							{result.title}
						</div>
						<span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
					</div>
				</div>)
		});

	return (
	<div className="ui form">
		<div className="field">
			<label>
				Enter Search Term
			</label>
			<input value={term} onChange={(e) => setTerm(e.target.value)} className="input" />
		</div>
		<div className="ui celled list">
			{renderedList}
		</div>
	</div>

	);
};

export default Search;

//learn above backwards.

//firs arg always a function, second [] or [element] or nothing

// useEffect(() => {
// 	console.log('something');
// }, [term] or [] or ...nothing... );

//[] first; [data] data has changed then rerender; ...nothing... rerender
