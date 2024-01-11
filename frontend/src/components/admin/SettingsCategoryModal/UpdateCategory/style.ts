import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.85rem;

    padding: 1rem;

    form {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;

        .inputContainer {
            width: 320px;
            border-radius: 0.25rem;
            background: ${props => props.theme.colors.inputBG};
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            
            span {
                padding: 0.25rem;
            }
            
            input {
                color: ${props => props.theme.colors.textOne};
                background: none;
                border: none;
                outline: none;
                padding-left: 0.5rem;
                font-size: 1.125rem;

                &::placeholder {
                    color: ${props => props.theme.colors.inputPlaceholder};
                }
            }
        }

        .errorMessage {
            border: 1px solid ${props => props.theme.colors.danger};
            
            &::placeholder {
                color: ${props => props.theme.colors.danger};
            }
        }

        .buttonSubmit {
            background: ${props => props.theme.colors.buttons};
            color: ${props => props.theme.colors.textThree};
            font-weight: 400;
            border: none;

            width: 320px;
            border-radius: 0.25rem;
            text-align: center;
            font-size: 1.25rem;

            margin-top: 0.75rem;

            &:hover {
                filter: brightness(1.2);
            }
        }
    }

    h2 {
        margin-top: 1rem;
        color: ${props => props.theme.colors.textOne};
    }

    .delete {
        display: flex;
        align-items: center;
        align-self: flex-end;
        font-weight: 500;
        color: ${props => props.theme.colors.danger};
        font-size: 1rem;
        
        svg {
            font-size: 2rem;
        }

        &:hover {
            filter: brightness(1.2);
        }
    }
`