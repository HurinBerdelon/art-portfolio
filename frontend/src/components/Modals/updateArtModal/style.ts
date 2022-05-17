import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    h2 {
        margin-top: 2rem;
    }

    div {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        img {
            height: 25rem;
        }

        form {
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            input {
                height: 2rem;
                border: solid 1px;
                border-radius: 0.25rem;
                text-align: center;
                font-size: 1.125rem;
            }

            textarea {
                height: 16rem;
                border: solid 1px;
                border-radius: 0.25rem;
                text-align: justify;
                padding: 0.25rem;
                font-size: 1.125rem;
            }

            button {
                margin-top: 1rem;
                height: 2rem;
                border: solid 1px;
                border-radius: 0.25rem;
            }
        }

}

`