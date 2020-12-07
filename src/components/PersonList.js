import React from 'react'
import { useQuery } from 'urql'

import Table from './Table'

import PageContext from './Pagination'

import { GET_ALL_PERSONS_VARS, FRAGMENT_PERSON } from '../queries/person'
 
const PersonList = () => {

  const [ page, setPage] = React.useState(1)
  const [ size, setSize] = React.useState(10)

    const [ result ] = useQuery({ 
      query: GET_ALL_PERSONS_VARS + FRAGMENT_PERSON,
      variables: { page, size }
    })
    const { data, fetching, error } = result
    
    if (fetching) return <div>Fetching...</div>
    if (error) return <div>Error!! {error}</div>
    
    const personsToRender = data.persons.results
    let info = data.persons.info 
    info = {
      ...info,
      page,
      setPage,
      size,
      setSize
    }

    return (
      <div>
        <PageContext.Provider value={ info }>
          <Table rowsToRender={personsToRender} />
        </PageContext.Provider>
        {/* <button onClick={() => setPage(page - 1)} disabled={page <=  1}>Prev Page</button>
        &nbsp;Page {page} of {info.pages}&nbsp;
        <button onClick={() => setPage(page + 1)} disabled={page >= info.pages}>Next Page</button> */}
        <br/>
        
      </div>
    );
  };

  

export default PersonList