import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 1rem;

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        li {
            height: 3rem;
            display: grid;
            grid-template-columns: 0.25fr 0.25fr 1fr 2fr 2fr 3.5fr;
            text-align: center;
            align-items: center;
            gap: 1rem;

            .editIcon:hover {
                color: #00F;
            }

            .deleteIcon:hover {
                color: #f00;
            }

            svg {
                cursor: pointer;
            }

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
`