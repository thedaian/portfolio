import React from 'react';
import './Portfolio.css';
import {portfolioProjects, aboutText, resumeData} from './projects.js'


function TagList(props)
{
	const tags = props.tags;
	return (
		<ul className="tags"><li><button onClick={(e) => props.filter("all")}>all</button></li>
		{ tags.map((tag) => 
			<li key={tag} className={tag}><button onClick={(e) => props.filter(tag)}>{tag}</button></li>
		)}
		</ul>
	);
}

function Project(props)
{
	let image;
	if(props.project.img)
	{
		image = <img src={props.project.img} alt={props.project.alt}/>;
	}
	return (
		<li className="project">
			<a href={props.project.url}>{props.project.name}</a>
			{image}
			<p>{props.project.description}</p>
			<TagList tags={props.project.tags} filter={props.filter} />
		</li>
	);
}

class ProjectListing extends React.Component
{
	constructor(props)
	{
		super(props);
		this.filterByTags = this.filterByTags.bind(this);
		this.state = {
			projects: portfolioProjects.slice(),
			sort: "all"
		};
	}
	
	filterByTags(tag)
	{
		const projects = portfolioProjects.slice();
		
		if(tag !== "all")
		{
			for(let i = 0; i < projects.length;)
			{
				if(!projects[i].tags.includes(tag))
				{
					projects.splice(i, 1);
				} else {
					i++;
				}
			}
		}
		
		this.setState({
			projects: projects,
			sort: tag
		});
	}
	
	render()
	{
		const listItems = this.state.projects.map((project) =>
			<Project key={project.key} project={project} filter={this.filterByTags} />
		);
		return (
			<div id="projects">
				Showing {this.state.sort} projects.
				<ul>{listItems}</ul>
			</div>
		)
	}
}

function Job(props)
{
	return (
		<li>
			<h4><strong>{props.job.company}</strong> / {props.job.title}</h4>
			<h5>{props.job.dates},  {props.job.location}</h5>
			{ props.job.accomplished.map((accomp, index) => 
				<p key={index}>{accomp}</p>
			)}
		</li>
	);
}

function Secret(props)
{
	return (
		<div>
			Secret section.
		</div>
	);
}

class Resume extends React.Component
{
	/*constructor(props)
	{
		super(props);
	}*/
	
	render()
	{
		const jobList = resumeData.map((job) =>
			<Job key={job.company} job={job} />
		);
		return (
			<div id="resume">
				<ul>{jobList}</ul>
			</div>
		)
	}
}

class Portfolio extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			page: "projects"
		};
	}
	
	changePage(p)
	{
		this.setState({
			page: p
		});
	}
	
	render()
	{
		let page;
		
		switch(this.state.page)
		{
			case "projects":
				page = <ProjectListing />;
				break;
			case "resume":
				page = <Resume />;
				break;
			case "secret":
				page = <Secret />;
				break;
		}
		
		return (
			<div>
			<div id="about">
			{aboutText.description}
			</div>
			<ul id="menu">
				<li><button onClick={this.changePage.bind(this, "projects")}>Projects</button></li>
				<li><button onClick={this.changePage.bind(this, "resume")}>Resume</button></li>
			</ul>
			{page}
			</div>
		)
	}
}

export default Portfolio;
