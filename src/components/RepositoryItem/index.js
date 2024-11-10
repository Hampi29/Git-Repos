// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoItem
  return (
    <li className="repocontainer">
      <img src={avatarUrl} alt={name} className="repoImage" />
      <h1>{name}</h1>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
