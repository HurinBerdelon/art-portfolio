import styled from "styled-components";

export const Container = styled.div`

    button {
        color: ${props => props.theme.colors.boxTwo};
        align-items: center;
        display: flex;

        svg {
            font-size: 1.8rem;

            &:hover {
                filter: brightness(1.2);
            }
        }
    }

    .availableIdioms {

        position: absolute;
        right: 0;
        top: 3rem;
        background: ${props => props.theme.colors.boxOne};
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        li {
            list-style: none;
            cursor: pointer;
            font-weight: 400;
            color: ${props => props.theme.colors.textOne};

            a {
                display: flex;
                gap: 1rem;

                span {
                    font-size: 1.125rem;
                    text-transform: capitalize;
                }

                .deactivated {
                    filter: grayscale(1);
                    color: ${props => props.theme.colors.gray};
                }
            }

            &:hover {
                filter: brightness(1.8);
            }
        }
    }
`