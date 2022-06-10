import styled from "styled-components";

export const Container = styled.div`
    width: 85%;
    height: 100%;
    overflow-y: auto;
    
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: 1fr 1fr; */

    background: var(--beige-100);

    @media (max-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
        /* grid-template-rows: 1fr 1fr; */
    }

    @media (max-width: 720px) {
        grid-template-columns: repeat(1, 1fr);
        /* grid-template-rows: 1fr 1fr; */
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
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            cursor: pointer;
            border: 2px solid #3D4D3E33;
            transform: scale(1.1)
        }

        .content {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            
            img {
                width: 100%;
                max-height: 12.8rem;
                filter: grayscale(1);
                transition: 0.2s;
                object-fit: contain;
            }

            &:hover {
                img {
                    filter: grayscale(0)
                }
            }
        }
    }
`