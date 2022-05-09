import styled from 'styled-components';

const DetailsText = styled.div`
  overflow-wrap: anywhere;
  margin: 0.75rem;
  line-height: 1.5;
  .filename {
    font-size: 2rem;
    margin-bottom: 0.25rem;
  }
  .filename-input {
    font-size: 2rem;
    width: 60%;
    text-align: center;
  }

  .url {
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.25rem;
  }
  .url:hover {
    background-color: #ce9ed6;
    color: white;
    cursor: copy;
  }
  .description-input {
    text-align: center;
  }
  .description {
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    line-height: 1;
  }
`;

export default DetailsText;
