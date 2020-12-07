const FRAGMENT_PERSON = `
    fragment fieldsPerson on Person {
        id
        firstName
        middleName
        lastName
        age
    }
`

export const GET_ALL_PERSONS_VARS = `
    query getAllPersons($page: Int!, $size: Int!) {
        persons(page: $page, size: $size) {
            info { count total size pages }
            results {
                ...fieldsPerson
            }
        }
   }
   ${FRAGMENT_PERSON}
`

export const GET_ALL_PERSONS = `
    query getAllPersons {
        persons {
            info { count total size pages }
            results {
                ...fieldsPerson
            }
        }
    }
`

export const NEW_PERSON = `
    mutation newPerson($firstName: String!, $middleName: String, $lastName: String!, $age: Int!) {
        newPerson(firstName: $firstName, middleName: $middleName, lastName: $lastName, age: $age) {
            ...fieldsPerson
        }
    }
    ${FRAGMENT_PERSON}
`