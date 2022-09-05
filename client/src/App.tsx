import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import Router from './Router';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Unreal_science_orbit';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Unreal_science_orbit.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;    
  }
  @font-face {
    font-family: 'ParkYongJun';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/ParkYongJun.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
  }
  body{
    color: ${(props) => props.theme.textColor};
    font-family: 'ParkYongJun';
  }
  a {
    color: inherit;
    text-decoration: none;

    &:hover {
    color: ${(props) => props.theme.activeColor};
  }
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
  }
  
`;
