import { format } from 'date-fns'
import { Image, Rate } from 'antd'

import './MovieItem.css'
import shortInfo from '../../services/shortInfo'
import moviesDb from '../../services/moviesDb'
import ratingColor from '../../services/ratingColor'

function MovieItem({ title, released, overview, poster, userscore }) {
  const moviesDB = new moviesDb()

  return (
    <div className='wrapper'>
      <section className='cover'>
        <Image
          src={moviesDB.getPoster(poster)}
          width={182}
          height={280}
          fallback='https://critics.io/img/movies/poster-placeholder.png'
        />
      </section>
      <section className='content'>
        <div className='userscore' style={{ border: `2px solid ${ratingColor(userscore)}` }}>
          {userscore}
        </div>
        <div className='case'>
          <h1 className='case__title'>{title}</h1>
          <p className='case__date'>{released ? format(new Date(released), 'MMM dd, yyyy') : 'No data'}</p>
          <p className='case__genre'>Action</p>
          <p className='case__genre'>Comedy</p>
          <div className='case__info'>{shortInfo(overview)}</div>
        </div>
        <Rate count={10} allowHalf={true} className='stars' />
      </section>
    </div>
  )
}

export default MovieItem
