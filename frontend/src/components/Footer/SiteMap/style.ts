import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 1rem 0rem;

  .imgContainer {
    position: relative;
    grid-column-start: 1;
    grid-column-end: 3;
    img {
      height: 70px;
    }

    .top {
      display: none;
      position: absolute;
      z-index: 1;
    }

    &:hover {
      .top {
        display: block;
      }
    }
  }

  .otherLinks {
    padding-top: 1.5rem;
  }

  li {
    list-style: none;
    text-transform: capitalize;
    cursor: pointer;
  }
`;
