import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    
    input, textarea, select, .buttonSubmit {
        
        width: 320px;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        text-align: center;
        font-size: 1.125rem;
        color: ${props => props.theme.colors.textOne};
        outline: none;

        &::placeholder {
            color: ${props => props.theme.colors.inputPlaceholder};
        }
    }

    input, select, .buttonSubmit {
        height: 2.125rem;
    }

    textarea {
        background: ${props => props.theme.colors.inputBG};
        height: 10rem;
        resize: none;
        padding: 0.25rem 0.5rem;
        text-align: justify;
        display: block;
    }

    input {
        background: ${props => props.theme.colors.inputBG};
        color: ${props => props.theme.colors.textOne};
    }

    select {
        background: ${props => props.theme.colors.inputBG};
        color: ${props => props.theme.colors.gray};
        font-family: 'Poppins';
        font-weight: 300;
    }

    select.errorMessage {
        color: ${props => props.theme.colors.danger};
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

        margin-top: 0.75rem;

        &:hover {
            filter: brightness(1.2);
        }
    }
    
`