import React from 'react';
import styled from 'styled-components';
import {subtleBoxShadow, lightBackground} from './Style';

const CoinGrid = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    margin: 20px;
`;

const CoinTile = styled.div`
    ${subtleBoxShadow}
    ${lightBackground}
    padding: 20px;
    border: 1px solid #fff;
    &:hover{
        cursor:pointer;
        color: #BC8B5E;
        border: 1px solid #BC8B5E;
    };
`;

export default function(){
    return <CoinGrid>
        {Object.keys(this.state.coinList).slice(0, 100).map(coin => 
            <CoinTile>
                <div>
                {this.state.coinList[coin].CoinName} 
                <span>   ({this.state.coinList[coin].Symbol})</span>
                </div>
                <div>
                    <img src={`https://www.cryptocompare.com/${this.state.coinList[coin].ImageUrl}`} style={{height: '50px'}} />
                </div>
            </CoinTile>)}
    </CoinGrid>
}