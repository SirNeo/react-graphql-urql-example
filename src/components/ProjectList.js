
import React from 'react'
import Project from './Project'

import { useQuery } from 'urql'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    getallProjects {
      id
      title
      releaseDate
    }
  }
`

const ProjectList = () => {

    const [result] = useQuery({ query: FEED_QUERY })
    const { data, fetching, error } = result
    
    if (fetching) return <div>Fetching...</div>
    if (error) return <div>Error!!</div>
    
    console.dir(data);
    const projectsToRender = data.getallProjects
    return (
      <div>
        {projectsToRender.map(project => <Project key={project.id} project={project} />)}
      </div>
    );
  };

export default ProjectList