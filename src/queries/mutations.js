

export const PROJECT = {
}

export const INITIATIVE_NOTE = {
    NEW: `
        mutation newNoteWithVariables($projectId: String!, $note: String!) {
            newNote(projectId: $projectId, note: $note) {
                notesId
                note
                projectId
                lstUpd
                updBy
            }
        }
    `
}