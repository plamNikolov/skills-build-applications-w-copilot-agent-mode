function Home() {
  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">🐙 Welcome to Octofit Tracker</h1>
            <p className="card-text">
              Your personal fitness tracking application. Log your activities, join teams,
              and compete on leaderboards!
            </p>
            <div className="mt-4">
              <h3>Features</h3>
              <ul>
                <li>Track your workouts and activities</li>
                <li>Create and join teams</li>
                <li>Compete on leaderboards</li>
                <li>Get personalized workout suggestions</li>
                <li>Monitor your progress</li>
              </ul>
            </div>
            <div className="mt-4">
              <h3>Getting Started</h3>
              <p>
                Navigate to the <strong>Activities</strong> page to start logging your first
                workout!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
