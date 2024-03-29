import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    h2 {
        margin: 1rem 0;
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
        gap: 2rem;

        .formContainer2 {
            height: 560px;
        }

        .formContainer, .formContainer2 {
            display: flex;
            gap: 1rem;
            flex-direction: column;
            align-items: center;

            .buttonSubmit {
                background: ${props => props.theme.colors.buttons};
                color: ${props => props.theme.colors.textThree};
                font-weight: 500;
                height: 2.125rem;
                width: 320px;
                border-radius: 0.25rem;
                font-size: 1.125rem;
                outline: none;

                &:hover {
                    filter: brightness(1.2);
                }
            }
        } 
    }
    
    .delete {
        display: flex;
        align-items: center;
        align-self: flex-end;
        font-size: 1rem;
        font-weight: 500;
        color: ${props => props.theme.colors.danger};
        
        svg {
            font-size: 2rem;
        }

        &:hover {
            filter: brightness(1.2);
        }
    }

    @media (min-width: 1024px) {

        height: 100%;

        form {
            flex-direction: row;
            height: 100%;
            width: 100%;
        }
    }
`