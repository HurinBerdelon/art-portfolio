import styled from "styled-components";

export const Container = styled.div`

    form {
        padding: 1rem;
        
        display: flex;
        flex-direction: column;

        label {
            color: ${props => props.theme.colors.textOne};
        }

        input, textarea, .buttonSubmit {
            margin-bottom: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            border: 1px solid ${props => props.theme.colors.backgroundTwo};
        }

        input, textarea {
            background: ${props => props.theme.colors.inputBG};
            color: ${props => props.theme.colors.textOne};
            outline: none;
            
            &::placeholder {
                color: ${props => props.theme.colors.inputPlaceholder};
            }
        }

        textarea {
            height: 8rem;
            resize: none;
        }

        .errorMessage {
        
            border: 1px solid ${props => props.theme.colors.danger};

            &::placeholder{
                color: ${props => props.theme.colors.danger};
            }
        }

        .buttonSubmit {
            background: ${props => props.theme.colors.buttons};
            color: ${props => props.theme.colors.textThree};
            font-weight: 500;
            font-size: 1.25rem;

            &:hover {
                filter: brightness(1.2);
            }
        }

    }
`