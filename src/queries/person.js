export const GET_ALL_PERSONS_VARS = `
    query getAllPersons($page: Int!, $size: Int!) {
        persons(page: $page, size: $size) {
            info { count total size pages }
            results {
                ...fieldsPerson
            }
        }
    }`;

export const GET_ALL_PERSONS = `
    query getAllPersons {
        persons {
            info { count total size pages }
            results {
                ...fieldsPerson
            }
        }
    }`;
export const FRAGMENT_PERSON = `
    fragment fieldsPerson on Person {
        id
        firstName
        middleName
        lastName
        age
    }`;
