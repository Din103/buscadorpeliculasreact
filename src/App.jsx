import './App.css'
import { useEffect, useState, useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

// Custom Hook useSearch
function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    // Solo establecer el error si hay uno
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
    } else if (search === '') {
      setError('No se puede buscar una película vacía')
    } else if (/\d/.test(search)) {  // Verifica si el query contiene números
      setError('No se puede buscar una película con un número')
    } else if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
    } else {
      setError(null)  // Limpiar el error si todo está bien
    }
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch() 

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: `1px solid ${error ? 'red' : 'transparent'}`, // Cambia el color del borde dependiendo del error
              borderRadius: '4px', 
              padding: '8px' 
            }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button type='submit' disabled={!!error}>Buscar</button>
        </form>
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <main className='main'>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
