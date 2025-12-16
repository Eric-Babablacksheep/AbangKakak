"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  User,
  Clock,
  Check,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Ahmad Rahman",
    role: "Student - Physics",
    avatar: "AR",
    lastMessage: "Thank you for the explanation!",
    lastMessageTime: "3:45 PM",
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hi Ahmad! How can I help you with physics today?",
        sender: "me",
        timestamp: new Date(Date.now() - 7200000),
        read: true,
      },
      {
        id: "2",
        text: "I'm having trouble understanding Newton's second law.",
        sender: "other",
        timestamp: new Date(Date.now() - 7100000),
        read: true,
      },
      {
        id: "3",
        text: "Let me explain it step by step. F = ma means force equals mass times acceleration.",
        sender: "me",
        timestamp: new Date(Date.now() - 7000000),
        read: true,
      },
      {
        id: "4",
        text: "Thank you for the explanation!",
        sender: "other",
        timestamp: new Date(Date.now() - 1800000),
        read: false,
      },
    ],
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    role: "Student - Mathematics",
    avatar: "SA",
    lastMessage: "Can we practice more calculus problems?",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Great work on today's calculus session!",
        sender: "me",
        timestamp: new Date(Date.now() - 10800000),
        read: true,
      },
      {
        id: "2",
        text: "Can we practice more calculus problems?",
        sender: "other",
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: "3",
        text: "Absolutely! I'll prepare some additional exercises for our next session.",
        sender: "me",
        timestamp: new Date(Date.now() - 3500000),
        read: true,
      },
    ],
  },
  {
    id: "3",
    name: "Mohamed Ali",
    role: "Student - Chemistry",
    avatar: "MA",
    lastMessage: "I'll submit my assignment tomorrow",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Don't forget to complete the chemical bonding worksheet.",
        sender: "me",
        timestamp: new Date(Date.now() - 86400000),
        read: true,
      },
      {
        id: "2",
        text: "I'll submit my assignment tomorrow",
        sender: "other",
        timestamp: new Date(Date.now() - 86200000),
        read: true,
      },
    ],
  },
  {
    id: "4",
    name: "Fatima Hassan",
    role: "Student - History",
    avatar: "FH",
    lastMessage: "The notes were very helpful!",
    lastMessageTime: "2 days ago",
    unreadCount: 2,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "I've uploaded the notes for Malaysia Independence.",
        sender: "me",
        timestamp: new Date(Date.now() - 172800000),
        read: true,
      },
      {
        id: "2",
        text: "The notes were very helpful!",
        sender: "other",
        timestamp: new Date(Date.now() - 172700000),
        read: false,
      },
    ],
  },
];

export default function MessagesPage() {
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    contacts[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact?.messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        sender: "me",
        timestamp: new Date(),
        read: true,
      };

      const updatedContacts = contacts.map((contact) => {
        if (contact.id === selectedContact.id) {
          return {
            ...contact,
            messages: [...contact.messages, newMessage],
            lastMessage: messageInput.trim(),
            lastMessageTime: "Just now",
          };
        }
        return contact;
      });

      setContacts(updatedContacts);
      setSelectedContact({
        ...selectedContact,
        messages: [...selectedContact.messages, newMessage],
        lastMessage: messageInput.trim(),
        lastMessageTime: "Just now",
      });
      setMessageInput("");
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read
    const updatedContacts = contacts.map((c) => {
      if (c.id === contact.id) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map((m) => ({ ...m, read: true })),
        };
      }
      return c;
    });
    setContacts(updatedContacts);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = contacts.reduce(
    (sum, contact) => sum + contact.unreadCount,
    0
  );

  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar - Contacts */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            {totalUnread > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                {totalUnread}
              </span>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedContact?.id === contact.id ? "bg-orange-50" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.avatar}
                </div>
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 truncate">
                    {contact.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {contact.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{contact.role}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500 truncate">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedContact.avatar}
                  </div>
                  {selectedContact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedContact.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedContact.isOnline ? "Online" : "Offline"} •{" "}
                    {selectedContact.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {selectedContact.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "me"
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`flex items-center justify-end space-x-1 mt-1 ${
                      message.sender === "me"
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === "me" &&
                      (message.read ? (
                        <CheckCheck className="w-3 h-3" />
                      ) : (
                        <Check className="w-3 h-3" />
                      ))}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Select a student to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
