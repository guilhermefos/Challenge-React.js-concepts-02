import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [repository, setRepository] = useState({})

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  function handleInputChange(e) {
    const { name, value } = e.target

    if (name === 'techs') {
      const techs = value.split(',').map(item => item.trim())
      setRepository({ ...repository, techs })
      return
    }

    setRepository({ ...repository, [name]: value })
  }

  async function handleAddRepository(e) {
    e.preventDefault()
    api.post('repositories', repository).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(repository => repository.id !== id))
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={`${repository.id}`}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <form onSubmit={handleAddRepository}>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="techs">Techs</label>
          <input
            type="text"
            name="techs"
            id="techs"
            onChange={handleInputChange}
          />
          <span>Adicione mais de um separando por virgula</span>
        </div>
        <button type="submit">Adicionar</button>
      </form>

    </div>
  );
}

export default App;
