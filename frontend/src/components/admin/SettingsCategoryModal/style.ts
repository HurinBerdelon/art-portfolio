import styled from "styled-components";

export const Container = styled.div`

    height: 320px;
    background: ${props => props.theme.colors.backgroundOne};

    position: absolute;
    z-index: 2;
    top: calc((100% - 320px)/2);
    left: 1rem;
    right: 1rem;
    border-radius: 0.5rem;
    overflow-y: scroll;
    margin: auto 0;

    .react-modal-close {
        position: absolute;
        z-index: 2;
        top: 1rem;
        right: 1rem;
    }
`