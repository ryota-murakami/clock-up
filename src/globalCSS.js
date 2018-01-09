import { injectGlobal } from 'styled-components'

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #ffffff;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  }
  
  #root {
    height: 100%;
  }
  
  #root > div {
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }
`
