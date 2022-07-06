import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
    gap: 0.25rem; // 4px
    padding: 2rem; // 16px
    margin: 0 auto;

    .links {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        font-weight: 500;
        
        .effectLinks {
            position: relative;
            cursor: pointer;
            color: ${props => props.theme.colors.textThree};
            
            &::after {
                content: '';
                height: 2px;
                border-radius: 0 0 2px 2px;
                width: 0%;
                position: absolute;
                bottom: 0.5px;
                left: 0px;
                background: ${props => props.theme.colors.textThree};
                transition: 0.75s
            }
            
            &.active::after {
                width: 20%
            }
            
            &:hover {
                &::after {
                    width: 100%;
                }
            }
        }
    }
`