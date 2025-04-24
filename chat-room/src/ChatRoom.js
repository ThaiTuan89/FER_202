import { useState } from 'react';
import { formatDistanceToNow, parse } from 'date-fns';

const ChatRoom = () => {
  // Khởi tạo dữ liệu ban đầu
  const [chatRoom, setChatRoom] = useState({
    id: "room1",
    name: "Demo Chat",
    participants: ["user1", "user2"],
    messages: [
      {
        id: "message1",
        text: "Hi Bob, how are you?",
        senderId: "user1",
        timestamp: "09-04-2024 09:00:00 PM",
      },
      {
        id: "message2",
        text: "Hey Alice, I'm good! How about you?",
        senderId: "user2",
        timestamp: "09-04-2024 09:01:00 PM",
      },
      {
        id: "message3",
        text: "I'm doing well, thanks for asking!",
        senderId: "user1",
        timestamp: "09-04-2024 09:02:00 PM",
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");
  const [senderId, setSenderId] = useState("user1");
  const [newParticipant, setNewParticipant] = useState("");
  const [removeParticipant, setRemoveParticipant] = useState("");
  const [editMessageId, setEditMessageId] = useState("");
  const [editMessageText, setEditMessageText] = useState("");
  const [deleteMessageId, setDeleteMessageId] = useState("");
  const [filterSender, setFilterSender] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("chronological"); // chronological hoặc latest

  // 1. Gửi tin nhắn mới
  const sendMessage = () => {
    if (!newMessage || !senderId) return;

    // Sử dụng Date.now() để tạo timestamp và định dạng chính xác
    const timestamp = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).replace(",", ""); // Đảm bảo định dạng khớp với dữ liệu ban đầu

    const newMsg = {
      id: `message${chatRoom.messages.length + 1}`,
      text: newMessage,
      senderId: senderId,
      timestamp: timestamp,
    };

    setChatRoom({
      ...chatRoom,
      messages: [...chatRoom.messages, newMsg],
    });
    setNewMessage("");
  };

  // 2. Liệt kê tất cả tin nhắn (có thể lọc và sắp xếp)
  const getMessages = () => {
    let filteredMessages = [...chatRoom.messages];

    // Lọc theo senderId
    if (filterSender) {
      filteredMessages = filteredMessages.filter(
        (msg) => msg.senderId === filterSender
      );
    }

    // Lọc theo từ khóa
    if (filterKeyword) {
      filteredMessages = filteredMessages.filter((msg) =>
        msg.text.toLowerCase().includes(filterKeyword.toLowerCase())
      );
    }

    // Sắp xếp
    if (sortOrder === "latest") {
      filteredMessages.sort((a, b) => {
        const dateA = parse(a.timestamp, "dd-MM-yyyy hh:mm:ss a", new Date());
        const dateB = parse(b.timestamp, "dd-MM-yyyy hh:mm:ss a", new Date());
        return dateB - dateA;
      });
    } else {
      filteredMessages.sort((a, b) => {
        const dateA = parse(a.timestamp, "dd-MM-yyyy hh:mm:ss a", new Date());
        const dateB = parse(b.timestamp, "dd-MM-yyyy hh:mm:ss a", new Date());
        return dateA - dateB;
      });
    }

    return filteredMessages;
  };

  // 3. Thêm người tham gia mới
  const addParticipant = () => {
    if (!newParticipant || chatRoom.participants.includes(newParticipant))
      return;

    setChatRoom({
      ...chatRoom,
      participants: [...chatRoom.participants, newParticipant],
    });
    setNewParticipant("");
  };

  // 4. Xóa người tham gia
  const removeParticipantFunc = () => {
    if (!removeParticipant) return;

    setChatRoom({
      ...chatRoom,
      participants: chatRoom.participants.filter(
        (participant) => participant !== removeParticipant
      ),
    });
    setRemoveParticipant("");
  };

  // 5. Chỉnh sửa tin nhắn
  const editMessage = () => {
    if (!editMessageId || !editMessageText) return;

    setChatRoom({
      ...chatRoom,
      messages: chatRoom.messages.map((msg) =>
        msg.id === editMessageId && msg.senderId === senderId
          ? { ...msg, text: editMessageText }
          : msg
      ),
    });
    setEditMessageId("");
    setEditMessageText("");
  };

  // 6. Xóa tin nhắn
  const deleteMessage = () => {
    if (!deleteMessageId) return;

    setChatRoom({
      ...chatRoom,
      messages: chatRoom.messages.filter((msg) => msg.id !== deleteMessageId),
    });
    setDeleteMessageId("");
  };

  // 8. Định dạng timestamp
  const formatTimestamp = (timestamp) => {
    try {
      // Đảm bảo định dạng chính xác và parse thành công
      const date = parse(timestamp, "dd-MM-yyyy hh:mm:ss a", new Date());
      if (isNaN(date.getTime())) {
        return "Invalid date"; // Trả về thông báo nếu ngày không hợp lệ
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Invalid date"; // Xử lý lỗi nếu parse thất bại
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {chatRoom.name} (ID: {chatRoom.id})
      </h1>

      {/* Người tham gia */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Participants:</h2>
        <pre className="bg-gray-100 p-2 rounded">{chatRoom.participants.join(", ")}</pre>
      </div>

      {/* Gửi tin nhắn */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Send a Message:</h2>
        <div className="flex gap-2">
          <select
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="p-2 border rounded"
          >
            {chatRoom.participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="p-2 border rounded flex-1"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>

      {/* Thêm người tham gia */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Add Participant:</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            placeholder="Enter user ID..."
            className="p-2 border rounded flex-1"
          />
          <button
            onClick={addParticipant}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Xóa người tham gia */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Remove Participant:</h2>
        <div className="flex gap-2">
          <select
            value={removeParticipant}
            onChange={(e) => setRemoveParticipant(e.target.value)}
            className="p-2 border rounded flex-1"
          >
            <option value="">Select a participant</option>
            {chatRoom.participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
          <button
            onClick={removeParticipantFunc}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Chỉnh sửa tin nhắn */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Edit Message:</h2>
        <div className="flex gap-2">
          <select
            value={editMessageId}
            onChange={(e) => setEditMessageId(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select a message</option>
            {chatRoom.messages
              .filter((msg) => msg.senderId === senderId)
              .map((msg) => (
                <option key={msg.id} value={msg.id}>
                  {msg.text}
                </option>
              ))}
          </select>
          <input
            type="text"
            value={editMessageText}
            onChange={(e) => setEditMessageText(e.target.value)}
            placeholder="New message text..."
            className="p-2 border rounded flex-1"
          />
          <button
            onClick={editMessage}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Xóa tin nhắn */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Delete Message:</h2>
        <div className="flex gap-2">
          <select
            value={deleteMessageId}
            onChange={(e) => setDeleteMessageId(e.target.value)}
            className="p-2 border rounded flex-1"
          >
            <option value="">Select a message</option>
            {chatRoom.messages.map((msg) => (
              <option key={msg.id} value={msg.id}>
                {msg.text}
              </option>
            ))}
          </select>
          <button
            onClick={deleteMessage}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Lọc và sắp xếp tin nhắn */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Filter & Sort Messages:</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={filterSender}
            onChange={(e) => setFilterSender(e.target.value)}
            placeholder="Filter by sender..."
            className="p-2 border rounded flex-1"
          />
          <input
            type="text"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            placeholder="Filter by keyword..."
            className="p-2 border rounded flex-1"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="chronological">Chronological</option>
            <option value="latest">Latest First</option>
          </select>
        </div>
      </div>

      {/* Hiển thị tin nhắn */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Messages:</h2>
        <div className="bg-gray-100 p-2 rounded max-h-96 overflow-y-auto">
          {getMessages().map((msg) => (
            <div
              key={msg.id}
              className={`p-2 mb-2 rounded ${
                msg.senderId === senderId ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              <p>
                <strong>{msg.senderId}</strong>: {msg.text}
              </p>
              <p className="text-sm text-gray-600">
                {formatTimestamp(msg.timestamp)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;