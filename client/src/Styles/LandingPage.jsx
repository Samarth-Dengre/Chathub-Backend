import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  nav {
    z-index: 2;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98vw;
    margin: 8px;
    border: 1px solid #9186f3;
    border-radius: 0.5rem;
    background-color: #090936;

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

    .brand {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      justify-content: center;
      img {
        height: 2rem;
      }
      h1 {
        color: white;
        font-size: 1.2rem;
        text-transform: uppercase;
      }
    }

    .links-and-buttons {
      button {
        padding: 5px;
        font-size: 1rem;
        cursor: pointer;
        background-color: #e0e7d9;
        margin: 4px;
        width: 5rem;
        border-radius: 10px;
        border: none;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        background: linear-gradient(100.34deg, #4b7391 7.65%, #42afff 107.72%);
      }
    }
  }

  .content {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    color: white;
    padding: 10px;
    img {
      animation: slide-down 1s ease-out forwards;
      height: 20rem;
    }
    .introduction {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      .gradient {
        background: linear-gradient(to right, #5b12b4 0%, violet 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .traffic-details {
    display: flex;
    justify-content: space-evenly;
    width: 80vw;
    color: white;
    margin-bottom: 2rem;
    h3 {
      background: #730acf;
      background: linear-gradient(to right, #730acf 0%, #ff85ad 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      font-size: 2rem;
    }
  }

  footer {
    background: linear-gradient(to right, #730acf 0%, #ff85ad 100%);
    padding: 0.5rem;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      height: 1.5rem;
      margin: 0 1rem;
    }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-4rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Container;
