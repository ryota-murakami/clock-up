import { injectGlobal } from 'styled-components'

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #ffffff;
  }
  
  #root {
    height: 100%;
  }
  
  #root > div {
    height: 100%;
  }
`
