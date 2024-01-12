import styled from "styled-components";

export const Container = styled.div`
  button {
    display: flex;
  }

  .menuContent {
    height: 70vh;
    width: 50vw;

    position: absolute;
    z-index: 3;
    background: ${(props) => props.theme.colors.boxOne};
    right: 0;

    font-size: 1.35rem;
  }

  .contentOverlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.75);
  }
`;
