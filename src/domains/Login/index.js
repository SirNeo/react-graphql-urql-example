
import msalInstance from '../../authProvider'

export const Login = () => {

    const login = () => {
        console.log('login')
        try {
            msalInstance.loginRedirect({});
        } catch (err) {
            console.log(err)
        }   
    }

    return (
        <>
            <button onClick={login}>Log In</button>

        </>
    )
}
