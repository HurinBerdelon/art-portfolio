import styled from "styled-components";

export const Container = styled.div`

    position: relative;
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    .dropdown-content {
        display: none;
        flex-direction: column;
        align-items: center;

        gap: 0.75rem;
        background: var(--green-900);
        border-radius: 0.25rem;

        position: absolute;
        bottom: 2rem;
        z-index: 1;

        height: 5rem;
        width: 100%;

        .socialMediaContent {
            display: flex;

            gap: 1rem;
            justify-content: center; 

            color: var(--beige-100);
            
            svg {
                font-size: 2rem;    
                
                &:hover {
                    color: var(--beige-500);
                    cursor: pointer;
                }
            }
        }

        .copyPaste {
            display: flex;

            border: none;
            width: 7rem;

            gap: 0.5rem;
            align-items: center;
            justify-content: center; 
            font-size: 1rem;

            background: none;
            color: var(--beige-100);

            &:hover {
                color: var(--beige-500);
            }
        }

    }

    .dropbtn {
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        background: none;
        color: var(--beige-100);

        &:hover{
            color: var(--beige-500);
        }
    }

    &:hover {
        .dropdown-content{
                display: flex;
        }
    }
    
`