import React from 'react';
import styled, {css} from 'styled-components';
import {subtleBoxShadow, lightBackground, goldBoxShadow, redBoxShadow} from './Style';
import _ from 'lodash';

export const CoinGrid = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    margin: 20px;
    ${props => props.count && css`
        grid-template-columns: repeat(${props.count > 7? props.count : 7}, 1fr);
    `
}
`;

export const CoinTile = styled.div`
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
export const CoinTileHeader = styled.div`
        display:grid;
        grid-template-columns: 1fr 1fr;   
`;
export const Icon = styled.div`
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
    //When filteredCoins is not initialized, Object.keys will break
    let coinKeys = favorites? this.state.favorites : (this.state.filteredCoins && Object.keys(this.state.filteredCoins)) || Object.keys(this.state.coinList).slice(0, 100);
    return <CoinGrid count={favorites && this.state.favorites.length}>
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