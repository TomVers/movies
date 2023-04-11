import { Component } from 'react'
import { Pagination } from 'antd'

import Movies from '../../Movies/Movies'
import moviesDb from '../../../services/moviesDb'

export default class Rated extends Component {
  state = {
    items: [],
    loading: false,
    query: '',
    page: 1,
    totalPages: null,
    error: null,
    guestId: JSON.parse(localStorage.getItem('guestId')),
    guestRating: JSON.parse(localStorage.getItem('rated')) || [],
  }

  moviesDB = new moviesDb()
  getMovies = (page) => {
    this.moviesDB.getRatedMovies(this.state.guestId, page).then(
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

  onPageChange = (page) => {
    this.setState({ page })
    this.getMovies(page)
  }

  componentDidMount() {
    this.getMovies()
  }

  render() {
    const { items, page, totalPages, loading, error, guestRating } = this.state
    return (
      <>
        <div className='movie-list'>
          <Movies items={items} loading={loading} error={error} guestRating={guestRating} />
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
