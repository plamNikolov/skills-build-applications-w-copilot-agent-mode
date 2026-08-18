import { useEffect, useState } from 'react';
import { normalizeArrayResponse } from '../config/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch(teamsApiUrl);
      if (!response.ok) {
        throw new Error('Unable to load teams.');
      }

      const payload = await response.json();
      const data = normalizeArrayResponse(payload, []);
      setTeams(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Unable to load teams.');
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(teamsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          admin: 'demo-user',
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Unable to create team.');
      }

      setFormData({ name: '', description: '' });
      await fetchTeams();
    } catch (err) {
      setError(err.message || 'Unable to create team.');
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Create Team</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Team
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Your Teams</h2>
            {loading ? (
              <p className="text-muted">Loading teams...</p>
            ) : teams.length === 0 ? (
              <p className="text-muted">No teams created yet.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {teams.map((team, index) => {
                  const key = team?._id || team?.id || `${team?.name}-${index}`;
                  const members = Array.isArray(team?.members) ? team.members : [];

                  return (
                    <li key={key} className="list-group-item">
                      <strong>{team.name}</strong>
                      <p className="mb-0 small text-muted">{team.description}</p>
                      <small className="text-muted">Members: {members.length}</small>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;
