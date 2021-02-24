import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiHeart, FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import '../Profile/styles.css';
import './style.css';

import LogoImg from '../../assets/logo.svg';

export default function Donate() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [donate, setDonate] = useState('');


  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente!');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  function valueDonated(value) {
    alert(`O valor de R$ ${value} foi doado!`);
    history.push('/profile');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero" />
        <span>Bem Vindo(a), {ongName}</span>

        <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Doar para caso</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value - donate)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>

            <li>
              <div className="content-donate">
                <input
                  className="donate-input"
                  type="number"
                  placeholder="Doe quanto quiser..."
                  value={donate}
                  onChange={e => setDonate(e.target.value)}
                />
                <Link className="donate" onClick={()=> valueDonated(donate)}>
                <FiHeart size={25} color="#f00" />
                </Link>
              </div>
            </li>
          </li>
        ))}
      </ul>
    </div>
  );
}