import React, { Fragment, useState } from 'react';

const Accordion = ({ items }) => {
	//useState hook
	const [activeIndex, setActiveIndex] = useState(null);   //[piece of state, f to update pieceof state] = useState(default val);
															//[theseNamesAre, notSpecial]
	const onTitleClick = (i) => setActiveIndex(i);

	const renderedItems = items.map((item, i) => {
		const active = activeIndex === i ? 'active' : '';

		return (
			<Fragment key={item.title} >
				<div className={`title ${active}`}  onClick={() => onTitleClick(i)}>
					<i className="dropdown icon"></i>
					{item.title}
				</div>
				<div className={`content ${active}`} >
					<p>
						{item.content}
					</p>
				</div>
			</Fragment>
		);
	});
	return (
		<div className="ui styled accordion">
			{renderedItems}
		</div>);
};

export default Accordion;