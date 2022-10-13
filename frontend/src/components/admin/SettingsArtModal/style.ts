import styled from "styled-components";

export const Container = styled.div`

    position: absolute;
    z-index: 2;
    top: 1rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-y: auto;
    margin: auto;
    
    background: ${props => props.theme.colors.backgroundTwo};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .react-card-flip {
        width: 100%;
        height: 100%;
    }

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 3;

        &:hover {
            filter: brightness(0.7);
        }
    }

    @media (min-width: 1024px) {
        left: 8rem;
        right: 8rem;
        height: 80%;
        margin: auto;
    }
`