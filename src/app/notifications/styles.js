import styles from 'react-notification-system/src/styles';

const s = {
  ...styles,
  Containers: {
    ...styles.Containers,
    DefaultStyle: {
      ...styles.Containers.DefaultStyle,
      padding: '0 20px 20px 20px',
      width: 340
    }
  },
  NotificationItem: {
    ...styles.NotificationItem,
    DefaultStyle: {
      ...styles.NotificationItem.DefaultStyle,
      overflow: 'hidden',
      transition: '0.3s ease-in-out'
    },
    success: {
      ...styles.NotificationItem.success,
      borderTop: 'none',
      backgroundColor: '#89b364',
      MozBoxShadow: 'none',
      WebkitBoxShadow: 'none',
      boxShadow: 'none'
    },
    error: {
      ...styles.NotificationItem.error,
      borderTop: 'none',
      backgroundColor: '#fc7bad',
      color: '#ffffff',
      MozBoxShadow: 'none',
      WebkitBoxShadow: 'none',
      boxShadow: 'none'
    }
  },

  Title: {
    ...styles.Title,
    error: {
      ...styles.Title.error,
      color: '#ffffff'
    }
  },

  Dismiss: {
    ...styles.Dismiss,
    DefaultStyle: {
      ...styles.Dismiss.DefaultStyle,
      display: 'none'
    }
  }
};

export default s;
