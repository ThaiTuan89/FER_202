import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessage } from '../store/chatSlice';
import { Link } from 'react-router-dom';

const ChatRoom = ({ chatroom }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage) return;

    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).replace(',', '');

    const newMsg = {
      id: `message${chatroom?.messages?.length + 1 || 1}`,
      text: newMessage,
      senderId: 'user1', // Cố định user1 theo yêu cầu đề bài
      timestamp: timestamp,
    };

    dispatch(addMessage(newMsg));
    setNewMessage('');
  };

  if (!chatroom || !chatroom.messages) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning" role="alert">
          No chat room data available. Please check the server connection.
        </div>
      </div>
    );
  }

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
        <Link to="/" className="text-muted">Home</Link> / Chat Room
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container">
          <img
            src="/img/fptu-banner-vr.png"
            alt="VR Tour Banner"
            className="img-fluid mb-4"
            style={{ width: '100%' }}
          />
          <div className="card mb-4">
            <div className="card-body">
              {chatroom.messages.map((msg) => (
                <div key={msg.id} className="border rounded p-2 mb-2">
                  <p className="mb-1">
                    <strong>{msg.senderId}</strong>: {msg.text}
                  </p>
                  <small className="text-muted">{msg.timestamp}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="form-control"
            />
            <button
              onClick={sendMessage}
              className="btn btn-danger"
            >
              Send
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-danger text-white text-center py-3">
        <p className="mb-0">@2024 - Created by FPTU</p>
      </footer>
    </div>
  );
};

ChatRoom.propTypes = {
  chatroom: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        senderId: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default ChatRoom;