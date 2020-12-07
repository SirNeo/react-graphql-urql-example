import React from 'react'
import { useQuery } from 'urql'

import Table from '../../components/Table'
import PageContext from '../../Context/Pagination'
import { GET_ALL_PERSONS_VARS, FRAGMENT_PERSON } from '../../queries/person'
 
const PersonList = () => {

  const [ page, setPage] = React.useState(1)
  const [ size, setSize] = React.useState(10)

  const [ executeQuery ] = useQuery({ 
    query: GET_ALL_PERSONS_VARS + FRAGMENT_PERSON,
    variables: { page, size }
  })
  
  const { data, fetching, error } = executeQuery
    
  if (fetching) return <div>Fetching...</div>
  if (error) return <div>Error!! {error}</div>   
    
  const personsToRender = data.persons.results
  const info = {
    ...data.persons.info,
    page,
    setPage,
    size,
    setSize
  }

  return (
    <PageContext.Provider value={ info }>
      <Table rows={personsToRender} />
    </PageContext.Provider>
  );
};

export default PersonList