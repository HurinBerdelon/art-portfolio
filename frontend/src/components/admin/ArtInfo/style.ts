import styled from "styled-components";

export const Container = styled.div`

    button {
        display: flex;
    }

    .content {
        position: absolute;
        z-index: 1;
        background: ${props => props.theme.colors.backgroundTwo};
        
        min-width: 180px;
        min-height: 100px;
        padding: 1rem;
        border-radius: 0.25rem;
        
        display: flex;
        flex-direction: column;
        
        color: ${props => props.theme.colors.textOne};
        
        h2 {
            font-size: 1.125rem; // default: 18px
            font-weight: 700;
            margin-bottom: .5rem;
        }
        
        p {
            font-size: 1rem; // default: 16px
            padding-right: 0.5rem;
            font-weight: 500;
            
            span {
                font-weight: 300;
                font-style: italic;
            }
        }
    }
`