import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    h2 {
        margin-top: 2rem;
    }

    form {
        width: 50%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;

        input {
            height: 2rem;
            border: solid 1px;
            border-radius: 0.25rem;
            text-align: center;
            font-size: 1.125rem;

            &:not(:first-of-type) {
                margin-top: 0.25rem;
            }

        }

        textarea {
            height: 14rem;
            border: solid 1px;
            border-radius: 0.25rem;
            padding: 0.25rem;
            text-align: justify;
            font-size: 1.125rem
        }

        button {
            height: 2rem;
            border: solid 1px;
            border-radius: 0.25rem;
        }

        .errorMessage {
            color: #f00;
            font-size: .825rem;
        }
    }
`