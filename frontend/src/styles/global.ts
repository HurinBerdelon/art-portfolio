import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --white: #FFFFFF;

        --gray-100: #e5e5e8;
        --gray-500: #525254;
        --gray-900: #232423;

        --beige-100: #FFF9F2;
        --beige-500: #D0C9C0;
        --green-400: #6D8B74;
        --green-600: #3D4D3E;
        --green-900: #2B332C;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width:  1080px) {
            font-size: 93.75%
        }

        @media (max-width:  720px) {
            font-size: 87.5%
        }
    }

    body {
        width: 100vw;
        height: 100vh;
        
        #__next {
            height: 100%;
        }
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 200;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 700;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
        border: none;
        background: none;
    }
`