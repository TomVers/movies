import { Component } from 'react'
import { Tabs, Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import Search from '../Pages/Search/Search'
import Rated from '../Pages/Rated/Rated'
import { Provider } from '../../context/genreContext'
import moviesDb from '../../services/moviesDb'

import './App.css'

export default class App extends Component {
  state = {
    genres: [],
  }
  tabs = [
    {
      key: '1',
      label: 'Search',
      children: <Search />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <Rated />,
    },
  ]

  moviesDB = new moviesDb()
  getGenres = () => {
    this.moviesDB.getGenres().then(
      (body) => {
        this.setState({
          genres: body.genres,
        })
      },
      (err) => {
        this.setState({
          error: err,
        })
      },
    )
  }

  componentDidMount() {
    this.getGenres()
  }

  render() {
    return (
      <div className='main'>
        <Provider value={this.state.genres}>
          <Online>
            <div className='tab-nav'>
              <Tabs defaultActiveKey='1' items={this.tabs} centered destroyInactiveTabPane />
            </div>
          </Online>
          <Offline>
            <Alert message='No internet!' description='Please, check your internet connection.' type='error' showIcon />
          </Offline>
        </Provider>
      </div>
    )
  }
}
