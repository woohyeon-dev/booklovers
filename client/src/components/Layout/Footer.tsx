import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBox>
      Icon source : &nbsp;
      <a href="https://www.flaticon.com/free-icons/book" title="book icons">
        Book icons created by Smashicons - Flaticon
      </a>
      ,&nbsp;
      <a href="https://www.flaticon.com/free-icons/user" title="user icons">
        User icons created by Freepik - Flaticon
      </a>
      ,&nbsp;
      <a href="https://www.flaticon.com/free-icons/add" title="add icons">
        Add icons created by Pixel perfect - Flaticon
      </a>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  border-top: 2px solid ${(props) => props.theme.lightborderColor};
  text-align: center;
  color: ${(props) => props.theme.borderColor};
  line-height: 30px;
  font-size: 13px;
`;

export default Footer;
