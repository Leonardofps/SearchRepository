import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
        margin-left: 10px;
      }
    `}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  a {
    text-decoration: none;
    color: '#7159c1';
    font-size: 16px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50px;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
`;

export const IssuesFilter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;

  button {
    background: #999;
    font-weight: bold;
    border-radius: 5px;
    padding: 9px;
    outline: 0;
    border: 0;
    margin: 0 0.5rem;
    cursor: pointer;
    &:nth-child(${props => props.active + 1}) {
      color: #fff;
    }
  }
`;

export const PageList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding-top: 15px;

  p {
    font-weight: bold;
    color: #000;
  }

  button {
    background: #7159c1;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px;
    outline: 0;
    border: 0;
    margin: 0 0.5rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;
