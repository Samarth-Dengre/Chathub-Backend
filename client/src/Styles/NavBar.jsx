import styled from "styled-components";
const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: auto;
  position: absolute;
  top: 0;

  background: linear-gradient(-45deg, #4e1d1d, #4040a5, #591f29);
  background-size: 400% 400%;
  -webkit-animation: gradient 10s ease infinite;
  animation: gradient 10s ease infinite;

  @-webkit-keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  border: 1px solid #9186f3;
  border-radius: 0.5rem;
  width: 100vw;
  padding: 6px;
  .brand {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  .navigation-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      width: auto;
      margin: 5px;
      height: 2rem;
      background-color: transparent;
      border: none;
      outline: none;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      cursor: pointer;
      :hover{
        background-color: #b3b3f4;
        border-radius: 1rem;
      }
    }
  }
  .right-links-and-buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    .search-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
      border-radius: 20px;
      height: 2.2rem;
      width: 16rem;
      overflow: hidden;
      border: 0.1rem solid #9186f3;
      .search-button {
        border: none;
        background: black;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        .search-buttons {
          filter: invert(100%);
        }
        :hover {
          cursor: pointer;
        }
        margin: 0;
      }
      input {
        width: 90%;
        height: 2rem;
        border: none;
        margin-right: 2px;
        outline: none;
        font-size: 1.1rem;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        padding: 7px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }
    button {
      margin-left: 1rem;
    }
  }
`;

export default NavBarContainer;
