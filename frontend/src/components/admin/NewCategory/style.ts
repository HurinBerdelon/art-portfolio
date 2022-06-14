import styled from "styled-components";

export const Container = styled.div`

    form {
        position: absolute;
        z-index: 1;
        border-radius: 0.25rem;
        box-shadow: 0.25rem 0.25rem 0.5rem var(--green-900);
        background: var(--beige-500); 

        padding: 1rem 2rem 2rem;
        display: flex;
        gap: 0.25rem;
        flex-direction: column;

        h4 {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        div {
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
            border: none;
            border-radius: 0.25rem;
            background: var(--green-600);
            color: var(--white);
            font-weight: 400;
            height: 1.5rem;
            
            margin-top: 0.75rem;
            
            &:hover {
                filter: brightness(1.2);
            }
        }
    }
    `