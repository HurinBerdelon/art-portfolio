import styled from "styled-components";

export const Container = styled.section`
    background: ${props => props.theme.colors.boxOne};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
    position: relative;

    color: ${props => props.theme.colors.textOne};

    .infos {
        display: flex;
        flex-direction: column;
        align-items: center;

        .dateInfo {
            font-size: .85rem;
            font-style: italic;
        }

        .descriptionInfo {
            padding-top: 1rem;
            text-align: justify;
            padding-right: 0.25rem;
            overflow-y: auto;
        }
    }

    .shareMedia {
        display: flex;
    }

    @media (min-width: 1024px) {
        width: 30%;
    }
`