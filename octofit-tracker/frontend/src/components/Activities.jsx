import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeArrayResponse } from '../config/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    type: 'running',
    duration: '',
    distance: '',
    calories: '',
    description: '',
  });

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/activities/'));
      if (!response.ok) {
        throw new Error('Unable to load activities.');
      }

      const payload = await response.json();
      const data = normalizeArrayResponse(payload, []);
      setActivities(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Unable to load activities.');
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(buildApiUrl('/activities/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'demo-user',
          type: formData.type,
          duration: Number(formData.duration),
          distance: formData.distance ? Number(formData.distance) : undefined,
          calories: formData.calories ? Number(formData.calories) : undefined,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Unable to save activity.');
      }

      setFormData({
        type: 'running',
        duration: '',
        distance: '',
        calories: '',
        description: '',
      });
      await fetchActivities();
    } catch (err) {
      setError(err.message || 'Unable to save activity.');
    }
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
            {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Recent Activities</h2>
            {loading ? (
              <p className="text-muted">Loading activities...</p>
            ) : activities.length === 0 ? (
              <p className="text-muted">No activities logged yet.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {activities.map((activity, index) => {
                  const key = activity?._id || activity?.id || `${activity?.type}-${index}`;
                  return (
                    <li key={key} className="list-group-item">
                      <strong>{activity.type}</strong> - {activity.duration} minutes
                      {activity.distance ? <span> ({activity.distance} km)</span> : null}
                      {activity.description ? <div className="small text-muted">{activity.description}</div> : null}
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

export default Activities;
