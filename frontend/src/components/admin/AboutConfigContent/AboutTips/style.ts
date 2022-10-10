import styled from "styled-components";

export const Container = styled.div`

    button {
        display: flex;
        position: absolute;
        bottom: 0.35rem;
        right: 1rem;
        color: ${props => props.theme.colors.textOne};
    }

    .content {
        position: absolute;
        z-index: 1;
        background: ${props => props.theme.colors.backgroundTwo};
        
        min-width: 180px;
        max-width: 280px;
        padding: 1rem 2rem;
        border-radius: 0.25rem;
                
        color: ${props => props.theme.colors.textOne};
        
        p {
            font-size: 0.85rem; // default: 16px
            text-align: justify;
            font-weight: 400;
        
        }
    }

    @media (min-width: 290px) {
        button {
            right: 1rem;
            top: 0.4rem;
        }
    }

    @media (min-width: 335px) {
        button {
            right: 1rem;
            top: 2.5rem;
        }
    }

    @media (min-width: 426px) {
        button {
            right: 0rem;
            bottom: -1.25rem;
        }
    }

    @media (min-width: 510px) {
        button {
            right: -3rem;
            top: 0.3rem;
        }
    }


`