import styled from "styled-components";

export const Container = styled.section`
    padding-top: 2rem;

    .buttonPrevious, .buttonNext {
        display: none;
    }

    img {
        object-fit: contain;
        width: 100%;
        max-height: 450px;
        border-radius: 0.5rem;
    }

    @media (min-width: 1024px) {
        display: flex;
        align-items: center;
        position: relative;
        width: 60%;

        img {
            max-height: 100%;
        }

        .buttonNext, .buttonPrevious {
            display: block;
            position: absolute;
            color: ${props => props.theme.colors.textOne};

            &:hover {
                filter: brightness(1.2);
            }
        }

        .buttonNext {
            right: -2rem;
        }

        .buttonPrevious {
            left: -2rem;
        }
    }
`