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
    overflow-y: scroll;
    
    background: ${props => props.theme.colors.backgroundOne};

    display: flex;
    align-items: center;
    justify-content: center;

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
`