import {fontSize, goldBoxShadow} from './Style';
import styled, {css} from 'styled-components';

export const ConfirmButton = styled.div`
    padding: 5px;
    margin: 20px;
    color: #BC8B5E;
    border: 1px solid #BC8B5E;
    ${fontSize}
    font-family: Exo 2, sans-serif;
    padding: 20px;
    height: 30px;
    width: 200px;
    border-radius: 5px;
    &:hover{
        ${goldBoxShadow}
        cursor: pointer;
    }
`;