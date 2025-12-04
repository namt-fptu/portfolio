import React, { useState } from 'react';
import { Send, Terminal } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg shadow-2xl p-2 md:p-8">
          
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-gray-500 font-mono text-sm">contact_server.sh</span>
          </div>

          <div className="font-mono space-y-6">
            <div className="text-gray-400">
              <span className="text-neon-green">root@portfolio</span>:<span className="text-blue-400">~</span>$ ./sendMessage
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group">
                <label className="block text-gray-500 text-xs mb-1">DESTINATION_EMAIL</label>
                <div className="flex items-center border-b border-gray-700 group-focus-within:border-neon-green transition-colors">
                   <span className="text-neon-cyan mr-2">&gt;</span>
                   <input 
                     type="email" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     placeholder="enter_email@address.com"
                     className="w-full bg-transparent text-white focus:outline-none py-2 placeholder-gray-700"
                   />
                </div>
              </div>

              <div className="group">
                 <label className="block text-gray-500 text-xs mb-1">PAYLOAD_MESSAGE</label>
                 <div className="flex items-start border-b border-gray-700 group-focus-within:border-neon-green transition-colors">
                   <span className="text-neon-cyan mr-2 mt-2">&gt;</span>
                   <textarea 
                     required
                     rows={4}
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                     placeholder="Write your message here..."
                     className="w-full bg-transparent text-white focus:outline-none py-2 placeholder-gray-700 resize-none"
                   />
                 </div>
              </div>

              <button 
                type="submit"
                disabled={status !== 'idle'}
                className="mt-6 w-full md:w-auto px-8 py-3 bg-neon-dim border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle' && <><Send size={18} /> EXECUTE_SEND</>}
                {status === 'sending' && "TRANSMITTING..."}
                {status === 'sent' && "MESSAGE_SENT_SUCCESSFULLY"}
              </button>
            </form>

            {status === 'sent' && (
              <div className="text-neon-green text-sm mt-4 animate-pulse">
                &gt; Acknowledgment received. 200 OK.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;