import React from 'react'
import { useMutation } from 'urql';

import { NEW_PERSON } from '../../../queries/person'

const CreatePerson = props => {

  const [ firstName, setFirstName ] = React.useState('')
  const [ middleName, setMiddleName ] = React.useState('')
  const [ lastName, setLastName ] = React.useState('')
  const [ age, setAge ] = React.useState(0)

  const [ data, setData ] = React.useState({})

  const [ state, executeMutation ] = useMutation(NEW_PERSON)

  const submit = React.useCallback(() => {
    
    const { data, fetching, error } = executeMutation( { firstName, middleName, lastName, age})
    if (fetching) return <div>Fetching...</div>
    if (error) return <div>Error!! {error}</div> 
    
    setData(data);

  }, [executeMutation, firstName, middleName, lastName, age])

  return (
    <div>
        <strong>New Person:</strong>
        <pre>
            <code>
                {JSON.stringify(data, null, 2)}
            </code>
        </pre>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={ firstName }
          onChange={e => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        />

        <input
          className="mb2"
          value={ middleName }
          onChange={e => setMiddleName(e.target.value)}
          type="text"
          placeholder="Middle Name"
        />

        <input
          className="mb2"
          value={ lastName }
          onChange={e => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        />
        
        <input
          className="mb2"
          value={ age }
          onChange={e => setAge(e.target.value)}
          type="text"
          placeholder="Age"
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

export default CreatePerson