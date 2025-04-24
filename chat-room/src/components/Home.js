import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-danger text-white py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            src="/img/fptu-logo.png"
            alt="FPTU Logo"
            style={{ height: '40px' }}
          />
          <nav>
            <Link to="/" className="text-white mx-2">Home</Link>
            <Link to="/chat" className="text-white mx-2">Chat Room</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="container my-2">
        <span>Home</span>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container text-center">
          <img
            src="/img/fptu-banner-home.png"
            alt="FPTU Banner"
            className="img-fluid mb-4"
            style={{ width: '100%' }}
          />
          <h1 className="text-warning mb-4">Welcome to Simple Chat Room</h1>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-danger text-white text-center py-3">
        <p className="mb-0">@2024 - Created by FPTU</p>
      </footer>
    </div>
  );
};

export default Home;