import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiConstants = {
  intial: 'initial',
  success: 'success',
  inProgress: 'In_Progress',
  failure: 'failure',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiConstants.intial,
  }
  selectItem = id => {
    this.setState({activeId: id},this.getRepositories)
  }
  componentDidMount() {
    this.getRepositories()
  }
  getRepositories = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const filteredata = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({reposList: filteredata, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure"
        />
        <h1>Something Went Wrong</h1>
      </div>
    )
  }

  renderRepositoriesView = () => {
    const {reposList} = this.state
    return (
      <ul className="repos">
        {reposList.map(each => (
          <RepositoryItem key={each.id} repoItem={each} />
        ))}
      </ul>
    )
  }

  renderRepos=()=>{
    const {apiStatus}=this.state
    switch(apiStatus){
      case apiConstants.success:
        return this.renderRepositoriesView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        null
    }
  }

  render() {
    const {reposList, activeId} = this.state
    return (
      <div>
        <h1>Popular</h1>
        <ul className="tabOptions">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageItem={each}
              selectItem={this.selectItem}
              isActive={each.id === activeId}
            />
          ))}
        </ul>
        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
