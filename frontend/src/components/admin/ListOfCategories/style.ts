import styled from "styled-components";

export const Container = styled.section`

    margin-top: 1rem;
    overflow: auto;

    table {
        width: 100%;

        tbody tr, thead tr {
            width: 100%;
            padding: 0 0.5rem;

            display: grid;
            grid-template-columns: repeat(4, 1fr);

            td {
                border-bottom: 1px dashed ${props => props.theme.colors.textOne};
            }

            .flags {
                font-size: 1.65rem;
            }

            .settings {
                display: flex;
                justify-content: center;

                .buttonAddCategory {
                    display: flex;

                    span {
                        display: none;
                    }

                    svg {
                        font-size: 2rem;
                        color: ${props => props.theme.colors.textOne};
                    }
                }
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
            }
        }
    }

    @media (min-width: 1024px) {
        table {
            tbody tr, thead tr {

                .settings {
                    .buttonAddCategory {
                        align-items: center;
                        gap: 0.5rem;
                        background: ${props => props.theme.colors.buttons};
                        border-radius: 0.25rem;
                        padding: 0.25rem 0.5rem;

                        svg {
                            font-size: 1.5rem;
                            color: ${props => props.theme.colors.textThree};
                        }
                        
                        span {
                            display: flex;
                            font-weight: 600;
                            font-size: 0.85rem;
                            color: ${props => props.theme.colors.textThree};
                        }
                        
                        &:hover {
                            filter: brightness(1.2);
                        }
                    }
                }

                td, th {
                    font-size: 1.2rem;
                }
            }
        }
    }
`