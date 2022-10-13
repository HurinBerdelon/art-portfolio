import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-top: 1rem; // 16px
    margin: 0 auto;
    color: ${props => props.theme.colors.textThree};

    svg {
        cursor: pointer;
        color: ${props => props.theme.colors.textThree};

        @media (min-width: 1024px) {
            font-size: 2rem;
        }
    }
    
    a {
        display: flex;
        align-items: center;

        svg:hover {
            filter: brightness(0.8);
        }
    }

    .sendMailDesktop {
        display: none;
    }

    @media (min-width: 1024px) {
        .sendMailDesktop {
            display: flex;

            svg:hover {
                filter: brightness(0.8);
            }
        }

        .sendMailMobile {
            display: none;
        }
    }
`