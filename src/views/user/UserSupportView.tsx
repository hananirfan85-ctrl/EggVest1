import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { SupportTicket } from '../../types';
import { HelpCircle, PlusCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const UserSupportView: React.FC = () => {
  const user = store.getCurrentUser();
  const [tickets, setTickets] = useState<SupportTicket[]>(store.getTickets(user.id));
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // New ticket state
  const [showNewModal, setShowNewModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'deposit' | 'withdrawal' | 'reward' | 'package' | 'technical' | 'other'>('reward');
  const [message, setMessage] = useState('');

  // Reply state
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      const u = store.getCurrentUser();
      const updatedList = store.getTickets(u.id);
      setTickets(updatedList);
      if (selectedTicket) {
        const found = updatedList.find(t => t.id === selectedTicket.id);
        if (found) setSelectedTicket(found);
      }
    });
    return unsub;
  }, [selectedTicket]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    const tkt = store.createSupportTicket(subject, category, message);
    setShowNewModal(false);
    setSubject('');
    setMessage('');
    setSelectedTicket(tkt);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    store.replyToTicket(selectedTicket.id, replyText, 'user');
    setReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">24/7 Customer Support Tickets</h1>
          <p className="text-slate-500 text-xs mt-1">Get immediate assistance regarding deposits, daily rewards, or farm coops</p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Open Support Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Ticket List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Your Tickets ({tickets.length})</h3>

          {tickets.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              No support tickets opened yet.
            </div>
          ) : (
            tickets.map(tkt => (
              <div
                key={tkt.id}
                onClick={() => setSelectedTicket(tkt)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  selectedTicket?.id === tkt.id
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900 text-xs truncate max-w-[200px]">{tkt.subject}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    tkt.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tkt.status}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                  <span className="capitalize">Category: {tkt.category}</span>
                  <span>{new Date(tkt.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Ticket Thread */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 min-h-[400px] flex flex-col justify-between">
          {selectedTicket ? (
            <>
              <div>
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{selectedTicket.subject}</h3>
                    <span className="text-[11px] text-slate-500">Ticket ID: #{selectedTicket.id}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-slate-100 text-slate-700">
                    Priority: {selectedTicket.priority}
                  </span>
                </div>

                <div className="py-4 space-y-3 max-h-80 overflow-y-auto">
                  {selectedTicket.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        msg.sender === 'user' ? 'bg-amber-50 border border-amber-200 text-slate-800 ml-8' : 'bg-slate-100 border border-slate-200 text-slate-900 mr-8'
                      }`}
                    >
                      <div className="flex justify-between font-bold text-[11px] text-slate-700">
                        <span>{msg.senderName} ({msg.sender === 'user' ? 'You' : 'Support Officer'})</span>
                        <span className="text-slate-400 font-normal">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendReply} className="flex gap-2 pt-3 border-t border-slate-100">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply message..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="m-auto text-center py-12 text-slate-400 text-xs">
              Select a ticket from the left column to view message thread.
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Open New Support Ticket</h3>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none"
                  placeholder="e.g. Question regarding deposit verification"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none"
                >
                  <option value="reward">Daily Reward Yields</option>
                  <option value="deposit">Deposit Inquiry</option>
                  <option value="withdrawal">Withdrawal Inquiry</option>
                  <option value="package">Package Allocation</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none"
                  placeholder="Type your question..."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
