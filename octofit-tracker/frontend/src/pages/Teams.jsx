import { useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send to API
    setTeams([...teams, { ...formData, id: Date.now(), members: [1] }]);
    setFormData({
      name: '',
      description: '',
    });
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
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Your Teams</h2>
            {teams.length === 0 ? (
              <p className="text-muted">No teams created yet.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {teams.map((team) => (
                  <li key={team.id} className="list-group-item">
                    <strong>{team.name}</strong>
                    <p className="mb-0 small text-muted">{team.description}</p>
                    <small className="text-muted">
                      Members: {team.members.length}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;
