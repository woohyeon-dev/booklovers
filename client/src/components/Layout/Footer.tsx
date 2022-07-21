import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBox>
      Icon source : &nbsp;
      <a href="https://www.flaticon.com/free-icons/book" title="book icons">
        Book icons created by Smashicons - Flaticon
      </a>
      &nbsp;&nbsp;
      <a href="https://www.flaticon.com/free-icons/user" title="user icons">
        User icons created by Freepik - Flaticon
      </a>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  border-top: 2px solid #f7f8f9;
  text-align: center;
  color: #aab1b8;
  line-height: 30px;
  font-size: 13px;
`;

export default Footer;
