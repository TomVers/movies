import { Component } from 'react'
import { Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import Movies from '../../Movies/Movies'
import moviesDb from '../../../services/moviesDb'

import './Search.css'

export default class Search extends Component {
  state = {
    items: [],
    loading: false,
    query: '',
    page: 1,
    totalPages: null,
    error: null,
  }

  moviesDB = new moviesDb()
  getMovies = (value, page) => {
    this.setState({ query: value })
    this.moviesDB.getMovies(value, page).then(
      (body) => {
        this.setState({
          items: body.results,
          loading: true,
          totalPages: body.total_pages,
        })
      },
      (err) => {
        this.setState({
          loading: true,
          error: err,
        })
      },
    )
  }

  onSearch = (event) => {
    this.setState({
      loading: false,
      page: 1,
    })
    let query = event.target.value
    if (query) {
      this.getMovies(query, this.state.page)
    } else {
      this.getMovies('harry', 1)
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.getMovies(this.state.query, page)
  }

  componentDidMount() {
    this.getMovies('harry')
  }

  render() {
    const { items, page, totalPages, loading, error } = this.state

    return (
      <>
        <Input
          className='search-input'
          type='text'
          placeholder='Type to search...'
          onChange={debounce(this.onSearch, 600)}
        />
        <div className='movie-list'>
          <Movies items={items} loading={loading} error={error} />
          <Pagination
            defaultCurrent={1}
            current={page}
            total={totalPages}
            onChange={this.onPageChange}
            showSizeChanger={false}
            pageSize={20}
            hideOnSinglePage
          />
        </div>
      </>
    )
  }
}
