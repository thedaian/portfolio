import React from 'react';
import './Portfolio.css';
import portfolioProjects from './projects.js'


function TagList(props)
{
	const tags = props.tags;
	return (
		<ul className="tags">
		{ tags.map((tag) => 
			<li key={tag}><button onClick={(e) => props.filter(tag)}>{tag}</button></li>
		)}
		</ul>
	);
}

function Project(props)
{
	let image;
	if(props.project.img)
	{
		image = <img src="{props.project.img}" alt={props.project.alt}/>;
	}
	return (
		<li>
			<a href="{props.project.url}">{props.project.name}</a>
			{image}
			<p>{props.project.description}</p>
			<TagList tags={props.project.tags} filter={props.filter} />
		</li>
	);
}

class Portfolio extends React.Component
{
	constructor(props)
	{
		super(props);
		this.filterByTags = this.filterByTags.bind(this);
		this.state = { projects: portfolioProjects.slice() };
	}
	
	filterByTags(tag)
	{
		const projects = portfolioProjects.slice();
		
		for(let i = 0; i < projects.length;)
		{
			if(!projects[i].tags.includes(tag))
			{
				projects.splice(i, 1);
			} else {
				i++;
			}
		}
		
		this.setState({
			projects: projects
		});
	}
	
	render()
	{
		const listItems = this.state.projects.map((project) =>
			<Project key={project.key} project={project} filter={this.filterByTags} />
		);
		return (
		<ul>
		{listItems}
		</ul>
		)
	}
}

export default Portfolio;
