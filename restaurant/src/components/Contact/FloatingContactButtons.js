import React from 'react';
import './FloatingContactButtons.css';

const FloatingContactButtons = ({ visible }) => {
  return (
    <div className={`floating-contact-icons ${visible ? 'visible' : ''}`}>
      {/* Icon gọi điện thoại */}
      <a href="tel:+84911085632" className="contact-icon phone-icon" title="Make a phone call">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      {/* Icon Zalo */}
      <a href="https://zalo.me/84911085632" target="_blank" rel="noopener noreferrer" className="contact-icon zalo-icon" title="Message via Zalo">
        <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/zalo_sharelogo.png" alt="Zalo" width="18" height="18"/>
      </a>

      {/* Icon Messenger */}
      <a href="https://m.me/trandangmytien2682003" target="_blank" rel="noopener noreferrer" className="contact-icon messenger-icon" title="Message via Messenger">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.36 2 2 6.13 2 11.7C2 14.56 3.33 17.07 5.47 18.83V22L8.6 20.15C9.71 20.5 10.83 20.5 12 20.5C17.64 20.5 22 16.37 22 10.8C22 5.23 17.64 2 12 2ZM13.08 15.15L10.85 12.71L6.5 15.15L11.33 10L13.67 12.45L17.91 10L13.08 15.15Z"/>
        </svg>
      </a>

      {/* Icon Live Chat */}
      <a href="#" className="contact-icon livechat-icon" title="Live Chat">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="9" y1="10" x2="15" y2="10"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      </a>
    </div>
  );
};

export default FloatingContactButtons;