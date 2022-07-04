import styled from "styled-components";

export const Container = styled.section`
    
    table {
        width: 100%;

        thead tr {
            margin-bottom: 0.5rem;
        }

        tbody tr, thead tr{
            width: 100%;
            padding: 0 0.5rem;

            display: grid;
            grid-template-columns: 1.5fr 2fr 4fr 2fr;

            td {
                border-bottom: 1px dashed ${props => props.theme.colors.textOne};
            }

            .settings {
                display: flex;
                justify-content: center;
            }

            th, td {
                display: flex;
                align-items: center;
                text-align: left;
                color: ${props => props.theme.colors.textOne};
                min-height: 40px;

                svg {
                    cursor: pointer;
                    color: ${props => props.theme.colors.textOne};
                }

                .title {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;
                }

                .imageContainer {
                    max-width: 40px;
                    padding: 0.125rem;
                    display: flex;
                    align-items: center;

                    img {
                        object-fit: contain;
                        width: 100%;
                    }
                }
            }
        }
    }

`