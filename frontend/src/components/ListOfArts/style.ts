import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    padding: 1rem;

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        li {
            height: 3rem;
            display: grid;
            grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
            text-align: center;
            align-items: center;
            gap: 1rem;

            p {
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            div {
                height: 3rem;

                img {
                    padding-bottom: 0.05rem;
                    height: 2.95rem;
                }
            }
        }
    }

    .newArt {
        position: absolute;
        margin: 0 1rem 1rem 0;
        bottom: 0;
        right: 0;

    }
`