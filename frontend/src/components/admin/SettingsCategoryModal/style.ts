import styled from "styled-components";

export const Container = styled.div`

    height: 320px;
    background: ${props => props.theme.colors.backgroundTwo};

    position: absolute;
    z-index: 2;
    top: calc((100% - 320px)/2);
    left: 1rem;
    right: 1rem;
    border-radius: 0.5rem;
    overflow-y: auto;
    margin: auto 0;

    display: flex;
    align-items: center;
    justify-content: center;

    .react-modal-close {
        position: absolute;
        z-index: 2;
        top: 1rem;
        right: 1rem;

        &:hover {
            filter: brightness(0.7);
        }
    }

    @media (min-width: 1024px) {
        height: 400px;
        width: 500px;
        margin: auto;
    }
`