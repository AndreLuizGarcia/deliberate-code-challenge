import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    height: 100vh;
  }
`

export const Wrapper = styled.div`
  background-color: #5479f7;

  display: flex;
  justify-content: center;
`

export const Grid = styled.div`
  margin: 0 32px;

  width: 1000px;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  margin-bottom: 32px;
`

export default GlobalStyles
