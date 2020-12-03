import React from 'react'

const Note = ({ note }) => (
  <div>
    <div>
      {note.notesId} - {note.note} ({note.projectId} [Updated by {note.updBy} ({note.lstUpd}) ])
    </div>
  </div>
)

export default Note