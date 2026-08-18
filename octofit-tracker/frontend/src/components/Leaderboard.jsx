import { useEffect, useState } from 'react';
import { normalizeArrayResponse } from '../config/api';

const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const leaderboardApiUrl = `${apiBase}/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(leaderboardApiUrl);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }

        const payload = await response.json();
        const data = normalizeArrayResponse(payload, []);
        setLeaderboard(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">🏆 Leaderboard</h2>
            {loading ? (
              <p className="text-muted">Loading leaderboard...</p>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : leaderboard.length === 0 ? (
              <p className="text-muted">No leaderboard data available.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Score</th>
                      <th>Activities</th>
                      <th>Total Distance (km)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => {
                      const userName =
                        entry?.user?.username || entry?.username || entry?.user?.profile?.firstName || `User ${index + 1}`;
                      const score = entry?.score ?? entry?.totalScore ?? 0;
                      const activitiesCount = entry?.activitiesCount ?? 0;
                      const totalDistance = entry?.totalDistance ?? 0;

                      return (
                        <tr key={entry?._id || entry?.id || `${userName}-${index}`}>
                          <td>
                            <strong>#{index + 1}</strong>
                          </td>
                          <td>{userName}</td>
                          <td>{score}</td>
                          <td>{activitiesCount}</td>
                          <td>{totalDistance}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
