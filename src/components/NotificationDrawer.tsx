import React from 'react';
import { X, Bell, Check, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationOpen, 
    setIsNotificationOpen, 
    notifications, 
    unreadCount, 
    markNotificationRead, 
    markAllNotificationsRead,
    recruitments,
    setSelectedRecruitment 
  } = useApp();

  if (!isNotificationOpen) return null;

  const handleNotificationClick = (linkId?: string, id?: string) => {
    if (id) markNotificationRead(id);
    if (linkId) {
      const job = recruitments.find(r => r.id === linkId);
      if (job) {
        setSelectedRecruitment(job);
        setIsNotificationOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Notifications & Alerts</h3>
              <p className="text-[11px] text-slate-500">{unreadCount} unread update{unreadCount === 1 ? '' : 's'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                Mark read
              </button>
            )}
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item.linkId, item.id)}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer space-y-1.5 ${
                item.isRead ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/50 border border-blue-100 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {item.title}
                </h4>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.message}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </span>
                {item.linkId && (
                  <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                    View Recruitment Details
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
          Real-time notification engine synchronized with official government gazettes.
        </div>
      </div>
    </div>
  );
};
