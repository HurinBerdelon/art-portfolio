import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    z-index: 2;
    background: var(--beige-500);
    border-radius: 0.25rem;
    box-shadow: 0.25rem 0.25rem 0.5rem var(--green-900);
    padding: 1rem;

    h4 {
        margin-bottom: 1rem;
    }

    .inputField {
        position: relative;
        width: 300px;

        label {
            position: absolute;
            left: 0.25rem;
        }
            
        input {
            border: solid 1px var(--green-900);
            border-radius: 0.25rem;
            padding: 0 2rem;
            text-align: center;
            font-size: 1rem;
            height: 1.5rem;
            width: 100%;
        }
            
        .errorMessage {
            border: 1px solid #f00;
                
            &::placeholder {
                color: #f00;
            }
        }
    }

    .buttonSubmit {
        margin-top: 1rem;

        svg {
            font-size: 1.7rem;
        }
    }
`