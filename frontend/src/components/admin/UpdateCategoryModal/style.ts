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

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: ${props => props.theme.colors.backgroundOne};

    form {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;

        input, .buttonSubmit {
        
            width: 320px;
            border: solid 1px ${props => props.theme.colors.textOne};
            border-radius: 0.25rem;
            text-align: center;
            font-size: 1.125rem;
        }

        .errorMessage {
            border: 1px solid ${props => props.theme.colors.danger};
            
            &::placeholder {
                color: ${props => props.theme.colors.danger};
            }
        }

        .buttonSubmit {
            background: ${props => props.theme.colors.boxOne};
            color: ${props => props.theme.colors.textTwo};
            font-weight: 400;

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

    .react-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
`