import React from 'react';
import styled from 'styled-components';
import {lightBackground, fontSize,textAlignCenter} from  './Style';
import {WhiteText} from './Text';

const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 20px;
    margin: 40px;
`;

const SearchInput = styled.input`
    ${lightBackground}
    place-self: center left;
    color:#1163c9;
    ${fontSize}
    margin: 5px;
    height: 25px;
    place-self: center left;
`;

export default function(){
    return <SearchContainer>
        <WhiteText>Search all coins</WhiteText>
        <SearchInput />
    </SearchContainer>
}