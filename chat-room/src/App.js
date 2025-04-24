import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatRoom } from './store/chatSlice';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

function App() {
  const dispatch = useDispatch();
  const chatRoom = useSelector((state) => state.chat.chatRoom);
  const status = useSelector((state) => state.chat.status);
  const error = useSelector((state) => state.chat.error);

  useEffect(() => {
    dispatch(fetchChatRoom());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={
            status === 'loading' ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <ChatRoom chatroom={chatRoom} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;