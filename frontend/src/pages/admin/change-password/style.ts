import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;

    display: flex;
    align-items: center;
    justify-content: center;

    .box {
        padding: 2rem;
        background: #222;
        border-radius: 0.5rem;

        h1 {
            font-size: 1.35rem;
            color: var(--white);
        }

        form {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            input, .buttonSubmit {
                border-radius: 0.25rem;
                text-align: center;
                font-size: 1.125rem;
                border: none;

            }

            .errorMessage {
                border: 1px solid #f00;
                
                &::placeholder {
                    color: #f00;
                }
            }

            .errorMessageDiv {
                color: #f00;
            }

            .buttonSubmit {
                background: var(--green-600);
                color: var(--white);
                font-weight: 400;

                margin-top: 0.5rem;

                &:hover {
                    filter: brightness(1.2);
                }
            }
        }
    }
`