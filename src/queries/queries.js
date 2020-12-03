
export const PROJECT = {
    GET_ALL: `
        {
            projects {
                id
                title
                releaseDate
            }
        }`,
    GET_ONE_BY_ID: `
        {
            getProject(id:"1001") {
                id
                title
                releaseDate
            }
        }`,
    GET_TWO_BY_ALIASES: `
        {
            getOne: getProject(id: "1001") {
              title 
            },
            getTwo: getProject(id: "1002") {
                title 
            }
        }`,

    GET_PROJECT_FRAGMENTS: `
        {
        getOne: getProject(id: "1001") {
          ...commonFields 
        },
        getTwo: getProject(id: "1002") {
          ...commonFields
        }
      }
      
      fragment commonFields on Project {
        id
        title
        releaseDate
      }
    `
}


export const INITIATIVE_NOTE = {
    GET_ALL: `
        query consultaNotas {
            notes {
                projectId
                note
                notesId
                lstUpd
                updBy
            }
        }`,
    GET_ONE_BY_ID: `
        {
            note(notesId:3) {
                projectId
                note
                notesId
                lstUpd
                updBy
            }
        }`,
    GET_TWO_BY_ALIASES: `
        {
            getOne: note(notesId: 1) {
                projectId
                note
                notesId
                lstUpd
                updBy 
            },
            getTwo: note(notesId: 3) {
                projectId
                note
                notesId
                lstUpd
                updBy 
            }
        }`,

    GET_NOTE_FRAGMENTS: `
        {
        getOne: note(notesId: 1) {
          ...commonFields 
        },
        getTwo: note(notesId: 3) {
          ...commonFields
        }
      }
      
      fragment commonFields on Project {
        projectId
        note
        notesId
        lstUpd
        updBy 
      }
    `
}