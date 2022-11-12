import styled from "styled-components";

export const Container = styled.div`
  color: white;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .upper-half {
    margin-top: 7rem;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid white;
    .avatar-image {
      border: 1px solid white;
      display: flex;
      width: auto;
      height: auto;
      img {
        width: 10rem;
      }
      .Change-Profile {
        background-color: blue;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        padding: 1px;
        cursor: pointer;
        position: relative;
        right: 19%;
        top: 7rem;
      }
    }
    .user-details {
      width: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid white;
      font-size: 1.5rem;
      gap: 0.6rem;
    }
  }
  .lower-half {
    width: 100vw;
    .contact-details {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
      border: 1px solid white;
      padding: 1rem;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        input {
          padding: 10px;
          width: 75%;
          border-radius: 10px;
          outline: none;
          font-size: 1rem;
        }
      }

      button{
        width: 8rem;
        padding: 5px;
        border-radius: 1rem;
        cursor: pointer;
        outline: none;
      }
    }
  }
`;
