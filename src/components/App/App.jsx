import { Component } from 'react'
import { Tabs, Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import Search from '../Pages/Search/Search'
import Rated from '../Pages/Rated/Rated'

import './App.css'

export default class App extends Component {
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

  render() {
    return (
      <div className='main'>
        <Online>
          <div className='tab-nav'>
            <Tabs defaultActiveKey='1' items={this.tabs} centered destroyInactiveTabPane />
          </div>
        </Online>
        <Offline>
          <Alert message='No internet!' description='Please, check your internet connection.' type='error' showIcon />
        </Offline>
      </div>
    )
  }
}
