import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      const { data } = response;

      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Nome do Repo ${Date.now()}`,
      url: 'teste',
      techs: ['Testezin', 'Testada'],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const filteredRepositories = repositories.filter((repo) => repo.id !== id);
    setRepositories(filteredRepositories);
    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
