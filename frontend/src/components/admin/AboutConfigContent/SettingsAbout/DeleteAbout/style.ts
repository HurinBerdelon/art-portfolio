import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6rem;

    padding: 1rem;

    h2 {
        color: ${props => props.theme.colors.textOne};
        margin-top: 1rem;
    }

    p {
        color: ${props => props.theme.colors.textOne};
        text-align: center;
        font-size: 1.125rem;
    }

    .buttons {
        display: flex;
        gap: 1rem;

        button {
            font-size: 1.125rem;
            font-weight: 500;
            padding: 0.25rem 0rem;
            border-radius: 0.25rem;
            width: 100px;
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

        .cancelButton {
            background: ${props => props.theme.colors.gray};
            color: ${props => props.theme.colors.textThree};
        }

        .confirmButton {
            background: ${props => props.theme.colors.danger};
            color: ${props => props.theme.colors.textThree};
        }
    }

    @media (min-width: 1024px) {
        margin: auto;
        height: 100%;
    }

`