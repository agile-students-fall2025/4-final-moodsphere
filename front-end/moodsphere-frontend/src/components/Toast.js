import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <span className="toast-icon">💙</span>
        <p className="toast-message">{message}</p>
      </div>
    </div>
  );
}

export default Toast;
