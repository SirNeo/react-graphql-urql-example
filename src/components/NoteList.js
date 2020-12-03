import React from 'react'
import { useQuery } from 'urql'
import Note from './Note'

import { INITIATIVE_NOTE } from '../queries/queries'

const NoteList = () => {

    const [result] = useQuery({ query: INITIATIVE_NOTE.GET_ALL })
    const { data, fetching, error } = result
    
    if (fetching) return <div>Fetching...</div>
    if (error) return <div>Error!!</div>
    
    console.dir(data);
    const notesToRender = data.notes
    
    return (
      <div>
        {notesToRender.map(note => <Note key={note.id} note={note} />)}
      </div>
    );
  };

export default NoteList