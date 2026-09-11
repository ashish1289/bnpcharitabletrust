import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, MapPin, CheckCircle, Clock, ChevronRight, User, FileText } from 'lucide-react';
import api from '../../api';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const userRes = await api.getCurrentUser();
        if (userRes.user.role !== 'agent') {
          navigate('/admin/login', { replace: true });
          return;
        }
        setAgent(userRes.user);

        const assignRes = await api.getAgentAssignments();
        if (assignRes.success) {
          setAssignments(assignRes.assignments);
        }
      } catch (error) {
        navigate('/admin/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {}
    localStorage.removeItem('bnpAuthUser');
    navigate('/admin/login', { replace: true });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const pending = assignments.filter(a => a.verificationStatus !== 'Verified').length;
  const verified = assignments.length - pending;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-6">
      {/* App Bar */}
      <div className="bg-indigo-600 text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg"><User size={20} /></div>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">{agent?.name}</h1>
            <p className="text-[10px] text-indigo-200 uppercase tracking-widest">Verification Agent</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <LogOut size={18} />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Assignments</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <span className="text-3xl font-black text-amber-500 mb-1">{pending}</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pending</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <span className="text-3xl font-black text-green-500 mb-1">{verified}</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Verified</span>
          </div>
        </div>
      </div>

      {/* Assignment List */}
      <div className="px-4 flex flex-col gap-3">
        {assignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 font-medium">No students assigned to you yet.</p>
          </div>
        ) : (
          assignments.map(student => (
            <div key={student._id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-3">
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl ${student.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {student.verificationStatus}
              </div>

              <div className="pr-16">
                <h3 className="font-extrabold text-gray-900 text-lg">{student.name}</h3>
                <p className="text-xs font-medium text-gray-500">{student.mobileNo}</p>
              </div>

              <div className="flex items-start gap-2 mt-1">
                <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-snug">{student.permanentAddress}</p>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase">{student.district}</span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase">{student.category}</span>
              </div>

              <button 
                onClick={() => navigate(`/agent/verify/${student._id}`)}
                className={`mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition ${
                  student.verificationStatus === 'Verified' 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                }`}
              >
                {student.verificationStatus === 'Verified' ? (
                  <>View Verification <CheckCircle size={16} /></>
                ) : (
                  <>Verify Application <FileText size={16} /></>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
