import styled from "styled-components";

export const Container = styled.div`

    .categoriesButton {
        color: ${props => props.theme.colors.textThree};
        cursor: pointer;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        svg {
            color: ${props => props.theme.colors.textThree};
            margin-left: -0.8rem; // -12.8px

            @media (min-width: 1024px) {
                font-size: 2rem;
            }
        }
    }

    .categoriesLink {
        padding-left: 1.35rem; //21.6px
        display: flex;
        flex-direction: column;
        gap: 0.25rem; // 4px
        margin-bottom: 0.5rem;
        font-size: 1.25rem;

        overflow-y: auto;
        overflow-x: hidden;
        color: ${props => props.theme.colors.textThree};
    }

    @media (min-width: 1024px) {
        .categoriesLink {
            max-height: 162px;
        }
    }

    @media (min-width: 1440px) {
        .categoriesLink {
            max-height: 200px;
        }
    }

    @media (min-width: 1600px) {
        .categoriesLink {
            max-height: 330px;
        }
    }
`