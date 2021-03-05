import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">
        Composed by
        <a href="https://www.krzem.dev" className="footer__text--highlited">Lech Krzemiński</a>
      </p><p className="footer__text">
        Icons by Visual Pharm imported from
        <a href="https://www.iconfinder.com/icons/172626/user_male_icon" className="footer__text--highlited">iconfinder.com</a>
        &copy;
      </p>
    </div>
  );
};

export default Footer;