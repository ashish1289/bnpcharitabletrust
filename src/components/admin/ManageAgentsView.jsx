import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, CheckCircle, Mail, Lock, User, Trash2 } from 'lucide-react';
import api from '../../api';

const ManageAgentsView = () => {
  const [agents, setAgents] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', district: '' });
  const [creating, setCreating] = useState(false);

  const fetchData = async () => {
    try {
      const [agentsData, distData] = await Promise.all([
        api.getAgents(),
        api.getUgDistricts()
      ]);
      if (agentsData.success) setAgents(agentsData.agents);
      if (distData.success) setDistricts(distData.districts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setMessage('');
    try {
      const data = await api.createAgent(form);
      if (data.success) {
        setMessage('Agent created successfully!');
        setForm({ name: '', email: '', password: '', district: '' });
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.message || 'Failed to create agent');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agent? All assigned students will be unassigned.')) return;
    try {
      const data = await api.deleteAgent(id);
      if (data.success) {
        setMessage('Agent deleted successfully');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      alert(error.message || 'Failed to delete agent');
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 min-w-0">
      {message && (
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-blue-700 font-medium flex items-center gap-3">
          <CheckCircle size={20} className="text-blue-500" />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Create Agent Form */}
        <div className="xl:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <UserPlus size={24} />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Create Agent</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Agent Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="agent@bnptrust.in" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Secure password" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assigned District (Optional)</label>
              <select value={form.district} onChange={e => setForm({...form, district: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm">
                <option value="">Any District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <button disabled={creating} type="submit" className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50">
              {creating ? 'Creating...' : 'Create Agent Account'}
            </button>
          </form>
        </div>

        {/* Agents List */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 shrink-0">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Active Agents ({agents.length})</h3>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-semibold">Agent Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">District</th>
                  <th className="p-4 font-semibold text-center">Assigned Users</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="4" className="p-8 text-center text-gray-500">Loading agents...</td></tr>
                ) : agents.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-gray-500">No agents created yet.</td></tr>
                ) : (
                  agents.map(agent => (
                    <tr key={agent._id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">{agent.name}</td>
                      <td className="p-4 text-gray-600">{agent.email}</td>
                      <td className="p-4">
                        {agent.district ? (
                          <span className="bg-purple-50 text-purple-700 font-bold px-2 py-1 rounded-md text-xs border border-purple-100">{agent.district}</span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">Any</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">{agent.assignedCount}</span>
                      </td>
                      <td className="p-4 text-right flex items-center justify-end gap-3">
                        <span className="bg-green-50 text-green-700 font-bold px-2 py-1 rounded-md border border-green-200 text-xs uppercase">Active</span>
                        <button onClick={() => handleDelete(agent._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition" title="Delete Agent">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAgentsView;
