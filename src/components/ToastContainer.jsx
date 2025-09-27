import React from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '../hooks/useAppHooks';

const ToastNotification = React.memo(({ notification }) => {
  const { removeNotification } = useNotifications();

  const handleClose = () => {
    removeNotification(notification.id);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'color-mix(in srgb, var(--accent-success) 15%, var(--bg-card))';
      case 'warning':
        return 'color-mix(in srgb, var(--accent-warning) 15%, var(--bg-card))';
      case 'error':
        return 'color-mix(in srgb, var(--accent-danger) 15%, var(--bg-card))';
      default:
        return 'color-mix(in srgb, var(--accent-primary) 15%, var(--bg-card))';
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'var(--accent-success)';
      case 'warning':
        return 'var(--accent-warning)';
      case 'error':
        return 'var(--accent-danger)';
      default:
        return 'var(--accent-primary)';
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case 'success':
        return 'var(--accent-success)';
      case 'warning':
        return 'var(--accent-warning)';
      case 'error':
        return 'var(--accent-danger)';
      default:
        return 'var(--accent-primary)';
    }
  };

  return (
    <div
      style={{
        background: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-sm)',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideInDown 0.3s ease-out',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Progress bar for auto-dismiss */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: getBorderColor(),
          animation: 'shrinkWidth 5s linear forwards',
          width: '100%'
        }}
      />
      
      <div className="flex-between">
        <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
          <div style={{ color: getIconColor() }}>
            {getIcon()}
          </div>
          <div>
            {notification.title && (
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: 'var(--spacing-xs)',
                color: 'var(--text-primary)'
              }}>
                {notification.title}
              </h4>
            )}
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: '1.4'
            }}>
              {notification.message}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--spacing-xs)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            transition: 'all var(--transition-fast)',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0,0,0,0.1)';
            e.target.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-muted)';
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
});

const ToastContainer = () => {
  const { notifications } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px', // Below the theme toggle
        right: '20px',
        zIndex: 9999,
        width: '400px',
        maxWidth: 'calc(100vw - 40px)'
      }}
    >
      {notifications.map((notification) => (
        <ToastNotification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

// Add CSS for the shrinking animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shrinkWidth {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;
document.head.appendChild(style);

export default ToastContainer;