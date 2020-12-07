import React from 'react'
import { useQuery } from 'urql'
import Project from './Project'

import { PROJECT, INITIATIVE_NOTE } from '../../queries/queries'

const ProjectList = () => {

    const [result] = useQuery({ query: INITIATIVE_NOTE.GET_ALL })
    const { data, fetching, error } = result
    
    if (fetching) return <div>Fetching...</div>
    if (error) return <div>Error!!</div>
    
    console.dir(data);
    const projectsToRender = data.notes
    
    return (
      <div>
        {projectsToRender.map(project => <Project key={project.id} project={project} />)}
      </div>
    );
  };

export default ProjectList