import React from 'react'

import gql from 'graphql-tag';
import { useMutation } from 'urql';

const POST_MUTATION = gql`
  mutation PostMutation($id: String!, $title: String!) {
    newProject(id: $id, title: $title, releaseDate: $releaseDate) {
      id
      title
      releaseDate
    }
  }
`

const CreateProject = props => {
  const [id, setId] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [releaseDate, setReleaseDate] = React.useState('')

  const [state, executeMutation] = useMutation(POST_MUTATION)
  
  const submit = React.useCallback(() => {
    executeMutation( { id }, { title }, { releaseDate })
  }, [executeMutation, id, title, releaseDate])

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={id}
          onChange={e => setId(e.target.value)}
          type="text"
          placeholder="ID for the project"
        />

        <input
          className="mb2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="A title for the project"
        />

        <input
          className="mb2"
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
          type="text"
          placeholder="Release Date for the project"
        />
        
      </div>
      <button
        disabled={state.fetching}
        onClick={submit}>
        Submit
      </button>
    </div>
  )
}

export default CreateProject