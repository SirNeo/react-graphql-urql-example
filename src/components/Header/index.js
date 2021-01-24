import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { getToken, deleteToken } from '../Token'

const Header = props => {
  const isLoggedIn = !!getToken();

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hi, your are logged</div>
        <Link to="/" className="ml1 no-underline black">
          Home
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/new" className="ml1 no-underline black">
              New Person
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-fixed">
        {isLoggedIn ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              deleteToken()
              props.history.push('/')
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  )
}

export default withRouter(Header)