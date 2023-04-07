import { Spin, Alert } from 'antd'

import MovieItem from './MovieItem'

export default function Movies({ items, loading, error }) {
  if (error) {
    return <Alert message='Error!' description='Could not get a movies from a server.' type='error' banner='true' />
  } else if (!loading) {
    return (
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <Spin size={'large'} tip='Loading'></Spin>
      </div>
    )
  } else if (!items.length) {
    return (
      <Alert message='No movies!' description='There are no movies for this search.' type='warning' banner='true' />
    )
  } else {
    return items.map((item) => (
      <MovieItem
        key={item.id}
        title={item.title}
        released={item.release_date}
        overview={item.overview}
        poster={item.poster_path}
        userscore={item.vote_average.toFixed(1)}
        genreId={item.genre_ids}
      />
    ))
  }
}
