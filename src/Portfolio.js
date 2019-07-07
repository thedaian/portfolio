import React from 'react';
import './Portfolio.css';
import projects from './projects.js'


function Portfolio() {
	function Tag(props)
	{
		return <li><button onClick={(e) => filterByTags(props.tag, e)}>{props.tag}</button></li>;
	}
	
	function TagList(props)
	{
		const tags = props.tags;
		return (
			<ul className="tags">
			{ tags.map((tag) =>
				<Tag key={tag} tag={tag} />
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
				<TagList tags={props.project.tags} />
			</li>
		);
	}
	
	class ProjectList extends React.Component {
		constructor(props)
		{
			super(props);
			const projects = props.projects;
			this.filterByTags = this.filterByTags.bind(this);
			
			this.state = { listItems: projects.map((project) =>
				<Project key={project.key}
					project={project} />
			)};
		}
		filterByTags(tag, e)
		{
			e.preventDefault();
			console.log("filtering by " + tag);
		}
		render() {
			return (
			<ul>
			{this.state.listItems}
			</ul>
			)
		}
	}

	return (
	  <ProjectList projects={projects} />
	);
}

export default Portfolio;
