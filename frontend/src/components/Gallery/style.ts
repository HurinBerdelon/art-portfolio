import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    height: 100%;
    overflow-y: auto;
    
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 720px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .card {
        margin: 2rem;
        aspect-ratio: 1;
        /* position: relative; */
        display: flex;
        justify-content: center;
        align-items: center;
        /* overflow: hidden; */
        /* z-index: 2; */
        /* background: #555; */

        &:hover {
            cursor: pointer;
            border: 2px solid #323239;
            transform: scale(1.1)
        }

        /* &:hover::before {
            content: '';
            background: conic-gradient(
                #000 0deg,
                transparent 240deg);
            width: 200%;
            height: 200%;
            position: absolute;
            z-index: 1;
            animation: rotate 2s linear infinite;
        }       */

        .content {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            
            img {
                height: 12.8em;
            }
        }
    }
`