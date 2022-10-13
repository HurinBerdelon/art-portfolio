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
    align-items: center;
    justify-content: center;

    background: ${props => props.theme.colors.backgroundTwo};

    form {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    h2 {
        margin-top: 1rem;
        color: ${props => props.theme.colors.textOne};
    }

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    @media (min-width: 1024px) {
        left: 8rem;
        right: 8rem;
        height: 80%;
        margin: auto;

        form {
            flex-direction: row;
            height: 100%;
            width: 100%;
        }
    }
`