import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
      } = useAuth0();

    const logoutWithRedirect = () =>
        logout({
        returnTo: window.location.origin,
        });


    return (
        <>
        {isAuthenticated && 
        <div>Hola {user.name}
        <img
            src={user.picture}
            alt="Profile"
            className="nav-user-profile rounded-circle"
            width="50"
        />
        <button
            id="qsLogout"
            color="primary"
            className="btn-margin"
            onClick={() => logoutWithRedirect()}
        >
        Log out
        </button>

        </div>}
        {!isAuthenticated && 
        <div>Hola don nadie
        <button
            id="qsLoginBtn"
            color="primary"
            className="btn-margin"
            onClick={() => loginWithRedirect()}
        >
        Log in
        </button>
        </div>}
        
      </>
    )
}

export default Login