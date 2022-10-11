import styled from "styled-components";

export const Container = styled.div`

    .switch {
        display: flex;
        align-items: center;
        height: 24px;
        width: 44px;
        border-radius: 1rem;

        &:hover {
            filter: brightness(1.2);
        }
    }

    .switchEnabled {
        background: ${props => props.theme.colors.boxTwo};
        
    }

    .switchNotEnabled {
        background: ${props => props.theme.colors.boxTwo};
    }

    span {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0.15rem 0.25rem;

        svg {
            width: 90%;
            height: 90%;
            color: ${props => props.theme.colors.textTwo};
        }
    }

    .iconEnabled {
        transform: translateX(20px);
    }

    .iconNotEnabled {
        transform: translateX(0);
    }
`