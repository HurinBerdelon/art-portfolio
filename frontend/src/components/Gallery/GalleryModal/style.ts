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
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-top: 6rem;

    background: ${props => props.theme.colors.backgroundOne};

    @media (min-width: 1024px) {
        flex-direction: row;
    }

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
`