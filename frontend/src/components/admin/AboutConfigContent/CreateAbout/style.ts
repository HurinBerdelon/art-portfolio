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
    justify-content: flex-start;
    gap: 1rem;

    background: ${props => props.theme.colors.backgroundOne};

    h2 {
        margin: 1.5rem 0;
        text-align: center;
        color: ${props => props.theme.colors.textOne};
        position: relative;

        span {
            font-style: italic;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3rem;

        .formContainer {
            display: flex;
            gap: 1rem;
            flex-direction: column;
            align-items: center;
            height: 90%;

            .buttonSubmit {
                background: ${props => props.theme.colors.buttons};
                color: ${props => props.theme.colors.textThree};
                font-weight: 500;
                height: 2.125rem;
                width: 320px;
                border-radius: 0.25rem;
                font-size: 1.125rem;
                outline: none;
                display: flex;
                align-items: center;
                justify-content: center;

                .loading {
                    animation: spin 2s ease infinite;

                    @keyframes spin {
                        0% {transform: rotate(0deg)}
                        100% {transform: rotate(360deg)}
                    }

                    &:hover {
                        cursor: default;
                    }
                };
    
                &:hover {
                    filter: brightness(1.2);
                }

                &:disabled {
                    filter: brightness(1);
                    cursor: default;
                }
            }
        }

    }

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;

        &:hover {
            filter: brightness(0.7);
        }
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