import styled from "styled-components";

export const ContentOverlay = styled.div`
    position: fixed;
    top: 0rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
`

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
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-top: 6rem;

    background: ${props => props.theme.colors.backgroundOne};

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
`