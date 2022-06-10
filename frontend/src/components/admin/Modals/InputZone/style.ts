import styled from "styled-components";

export const Container = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    
    padding-right: 4rem;

    input, textarea, select, .buttonSubmit {
        margin-left: 20%;
        width: 70%;
        border: solid 1px var(--green-900);
        border-radius: 0.25rem;
        text-align: center;
        font-size: 1.125rem;
    }

    input, select, .buttonSubmit {
           height: 2rem;
    }

    textarea {
        height: 16rem;
        resize: none;
        padding: 0.25rem 0.5rem;
        text-align: justify;
        display: block;
    }

    select {
        background: #FFF;
        font-family: 'Poppins';
        font-weight: 300;
    }

    .errorMessage {
        color: #f00;
        &::placeholder {
            color: #f00;
        }
    }

    .buttonSubmit {
        background: var(--green-600);
        color: var(--white);
        font-weight: 400;

        margin-top: 0.75rem;

        &:hover {
            filter: brightness(1.2);
        }
    }
    
`