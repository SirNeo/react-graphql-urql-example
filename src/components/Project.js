import React from 'react'

const Project = ({ project }) => (
  <div>
    <div>
      {project.id} {project.title} ({project.releaseDate})
    </div>
  </div>
)

export default Project