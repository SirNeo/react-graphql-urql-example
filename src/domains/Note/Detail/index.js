import React from 'react'

const Note = ({ note }) => (
  <div>
    <div>
      {note.id} - {note.note} ({note.projectId} [Updated by {note.updatedBy} ({note.lastUpdated}) ])
    </div>
  </div>
)

export default Note