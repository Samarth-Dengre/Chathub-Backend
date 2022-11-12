import styled from "styled-components";

const SearchedUsersContainer = styled.div`
  position: absolute;
  top: 2.8rem;
  background-color: black;
  color: white;
  padding: 0.5rem;
  width: 20rem;
  max-height: 20rem;
  border: 0.1rem solid #9186f3;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  .users {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    .user {
      background-color: #ffffff39;
      height: 2.5rem;
      width: 95%;
      border-radius: 0.2rem;
      padding: 0.3rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.3s ease-in-out;
      :hover{
        background-color: #9186f3;
      }
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      .view-profile {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: absolute;
        right: 30px;
        width: 5rem;
        .searched-users-buttons {
          cursor: pointer;
          height: 2rem;
          :hover{
            background-color: black;
            border-radius: 40%;
            padding: 3px;
            cursor: pointer;
          }
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
`;

export default SearchedUsersContainer;
