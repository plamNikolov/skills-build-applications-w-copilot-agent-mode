import { useEffect, useState } from 'react';
import { normalizeArrayResponse } from '../config/api';

const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const workoutsApiUrl = `${apiBase}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(workoutsApiUrl);
        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }

        const payload = await response.json();
        const data = normalizeArrayResponse(payload, []);
        setWorkouts(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Workouts</h2>
            {loading ? (
              <p className="text-muted">Loading workouts...</p>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : workouts.length === 0 ? (
              <p className="text-muted">No workouts available.</p>
            ) : (
              <div className="row g-3">
                {workouts.map((workout, index) => {
                  const key = workout?._id || workout?.id || `${workout?.title || 'workout'}-${index}`;

                  return (
                    <div className="col-md-6" key={key}>
                      <div className="card h-100 border-light shadow-sm">
                        <div className="card-body">
                          <h5 className="card-title">{workout.title}</h5>
                          <p className="text-muted small mb-2">Difficulty: {workout.difficulty || 'General'}</p>
                          <p className="card-text">{workout.description || 'No description provided.'}</p>
                          <div className="small text-muted">
                            {workout.duration ? `Duration: ${workout.duration} min` : 'Duration: flexible'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
