import './App.css'
import { useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const {movies} = useMovies()
  const inputRef = useRef()
  const [query, setQuery] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()    
  }

  const handleChange = (event)=> {
    setQuery(event.target.value)
    console.log(query);    
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
