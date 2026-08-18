import { useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    type: 'running',
    duration: '',
    distance: '',
    calories: '',
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
    setActivities([...activities, { ...formData, id: Date.now() }]);
    setFormData({
      type: 'running',
      duration: '',
      distance: '',
      calories: '',
      description: '',
    });
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Log Activity</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Activity Type</label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="workout">Workout</option>
                  <option value="walking">Walking</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Distance (km)</label>
                <input
                  type="number"
                  className="form-control"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  step="0.1"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Calories Burned</label>
                <input
                  type="number"
                  className="form-control"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
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
                Log Activity
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Recent Activities</h2>
            {activities.length === 0 ? (
              <p className="text-muted">No activities logged yet.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {activities.map((activity) => (
                  <li key={activity.id} className="list-group-item">
                    <strong>{activity.type}</strong> - {activity.duration} minutes
                    {activity.distance && <span> ({activity.distance} km)</span>}
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

export default Activities;
