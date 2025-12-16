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
    name: "Dr. Ahmad Rahman",
    role: "Physics Tutor",
    avatar: "AR",
    lastMessage: "Great work on today's assignment!",
    lastMessageTime: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hi Ahmad! Ready for today's physics session?",
        sender: "me",
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: "2",
        text: "Yes! I've prepared some questions about forces.",
        sender: "other",
        timestamp: new Date(Date.now() - 3500000),
        read: true,
      },
      {
        id: "3",
        text: "Perfect! Let's start with Newton's laws.",
        sender: "other",
        timestamp: new Date(Date.now() - 3400000),
        read: true,
      },
      {
        id: "4",
        text: "Great work on today's assignment!",
        sender: "other",
        timestamp: new Date(Date.now() - 1800000),
        read: false,
      },
    ],
  },
  {
    id: "2",
    name: "Puan Siti Aishah",
    role: "Mathematics Tutor",
    avatar: "SA",
    lastMessage: "See you tomorrow at 4 PM",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Can we reschedule tomorrow's session?",
        sender: "me",
        timestamp: new Date(Date.now() - 86400000),
        read: true,
      },
      {
        id: "2",
        text: "Sure, how about 4 PM instead?",
        sender: "other",
        timestamp: new Date(Date.now() - 86300000),
        read: true,
      },
      {
        id: "3",
        text: "That works for me. Thanks!",
        sender: "me",
        timestamp: new Date(Date.now() - 86200000),
        read: true,
      },
      {
        id: "4",
        text: "See you tomorrow at 4 PM",
        sender: "other",
        timestamp: new Date(Date.now() - 86100000),
        read: true,
      },
    ],
  },
  {
    id: "3",
    name: "Mr. David Smith",
    role: "English Tutor",
    avatar: "DS",
    lastMessage: "Your essay has improved significantly!",
    lastMessageTime: "2 days ago",
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "I've submitted my latest essay.",
        sender: "me",
        timestamp: new Date(Date.now() - 172800000),
        read: true,
      },
      {
        id: "2",
        text: "Your essay has improved significantly!",
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

      // Simulate reply after 2 seconds
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! I'll get back to you soon.",
          sender: "other",
          timestamp: new Date(),
          read: false,
        };

        setContacts((prev) =>
          prev.map((contact) => {
            if (contact.id === selectedContact.id) {
              return {
                ...contact,
                messages: [...contact.messages, replyMessage],
                lastMessage: replyMessage.text,
                lastMessageTime: "Just now",
                unreadCount: contact.unreadCount + 1,
              };
            }
            return contact;
          })
        );

        if (selectedContact) {
          setSelectedContact((prev) =>
            prev
              ? {
                  ...prev,
                  messages: [...prev.messages, replyMessage],
                  lastMessage: replyMessage.text,
                  lastMessageTime: "Just now",
                }
              : null
          );
        }
      }, 2000);
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

  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar - Contacts */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
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
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                    {selectedContact.isOnline ? "Online" : "Offline"}
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
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`flex items-center justify-end space-x-1 mt-1 ${
                      message.sender === "me"
                        ? "text-orange-100"
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="text-gray-600">
              Select a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
