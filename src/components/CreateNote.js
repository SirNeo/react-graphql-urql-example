import React from 'react'

import { useMutation } from 'urql';
import { INITIATIVE_NOTE } from '../queries/mutations'

const CreateNote = props => {

  const [note, setNote] = React.useState('')
  const [projectId, setProjectId] = React.useState('')

  const [state, executeMutation] = useMutation(INITIATIVE_NOTE.NEW)
  
  console.log('state:');
  console.dir({state});

  const submit = () => {
    //console.log(`note: ${note}`)

    const variables = { note: note, projectId: projectId }

    console.log('variables: ')
    console.log({variables})

    executeMutation(variables).then(result => {
      console.log('ejecutado mutacion');
      console.log(result);
    })

  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={note}
          onChange={e => setNote(e.target.value)}
          type="text"
          placeholder="notes notes"
        />

        <input
          className="mb2"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          type="text"
          placeholder="Project ID"
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

export default CreateNote