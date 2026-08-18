import { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // TODO: Fetch leaderboard from API
    // For now, using mock data
    setLeaderboard([
      {
        id: 1,
        username: 'user1',
        score: 1500,
        activitiesCount: 20,
        totalDistance: 150,
      },
      {
        id: 2,
        username: 'user2',
        score: 1200,
        activitiesCount: 18,
        totalDistance: 120,
      },
      {
        id: 3,
        username: 'user3',
        score: 1000,
        activitiesCount: 15,
        totalDistance: 100,
      },
    ]);
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">🏆 Leaderboard</h2>
            {leaderboard.length === 0 ? (
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
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>
                          <strong>#{index + 1}</strong>
                        </td>
                        <td>{entry.username}</td>
                        <td>{entry.score}</td>
                        <td>{entry.activitiesCount}</td>
                        <td>{entry.totalDistance}</td>
                      </tr>
                    ))}
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
