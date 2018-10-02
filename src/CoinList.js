import React from 'react';
import styled, {css} from 'styled-components';
import {subtleBoxShadow, lightBackground, goldBoxShadow, redBoxShadow} from './Style';

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
        ${goldBoxShadow}
    }
    ${props => props.favorite && css`
        &:hover{
            cursor:pointer;
            ${redBoxShadow}
        }
    `}
    ${props=> props.chosen && !props.favorite && css`
        pointer-events: none;
        opacity: 0.4;
    `}
`;
const CoinTileHeader = styled.div`
        display:grid;
        grid-template-columns: 1fr 1fr;   
`;
const Icon = styled.div`
    justify-self: right;
    display:none;
    ${CoinTile}:hover & {
        display: block;
    }
    ${props => props.favorite && css`
    ${CoinTile}:hover & {
        color: red;
    }
`}    
`;

export default function(favorites= false){
    //console.log(this.state.favorites);
    let coinKeys = favorites? this.state.favorites :Object.keys(this.state.coinList).slice(0, 100);
    return <CoinGrid>
        {coinKeys.map(coinKey => 
            <CoinTile chosen={this.isInFavorites(coinKey)} favorite = {favorites} onClick = {
                favorites? () =>{this.removeCoinFromFavorites(coinKey)}:
                ()=>{this.addCoinToFavorites(coinKey)}
                
                }>
                <CoinTileHeader>
                    <div>
                    {this.state.coinList[coinKey].CoinName} 
                <span>   ({this.state.coinList[coinKey].Symbol})</span>
                    </div>
                        
                        <Icon favorite = {favorites}>
                           {favorites?'x': 'Add'}

                        </Icon>
                </CoinTileHeader>
                <div>
                    <img src={`https://www.cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`} style={{height: '50px'}} />
                </div>
            </CoinTile>)}
    </CoinGrid>
}