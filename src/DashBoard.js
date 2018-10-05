import React from 'react';
import {CoinGrid, CoinTile, CoinTileHeader} from './CoinList';
import styled, {css} from 'styled-components';
import {fontSizeBig, fontSize, fontSize3, lightBackground, subtleBoxShadow, goldBoxShadow, yellowBackground} from './Style';
import theme from './HighChartsTheme';  
import HighChartsConfig from './HighCharts';
import ReactHighCharts from 'react-highcharts';

ReactHighCharts.Highcharts.setOptions(theme());

const PriceDiv = styled.div`
    justify-self: right;
    color: green;
    ${props => props.negative && css`
        color: red;
    `}
    ${props => props.zero && css`
        color: #BC8B5E;
`}
`;

const TickerPrice = styled.div`
    ${fontSizeBig}
`;

const CoinTileCompact = CoinTile.extend`
    ${fontSize3}
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    justifyitems: right;
`;

const PaddingLight = styled.div`
    ${lightBackground}
    ${subtleBoxShadow}
    padding: 5px;
`;
const ChartGrid = styled.div`
    display: grid;
    margin-top: 40px;
    grid-gap: 20px;
    grid-template-columns: 1fr 3fr;
`;
const numberFormat = (number)=>{
    return + (number+'').slice(0,7);
}
const ChartSelector = styled.select`
    ${lightBackground}
    color:#BC8B5E;
    ${fontSize3}
    margin: 5px;
    height: 25px;
   float: right;
   &:hover{
       ${goldBoxShadow}
   }
`;


export default function(){

    return [<CoinGrid key={'coingrid'}>
        {
        this.state.prices.map((price, index) =>{
        let sym = Object.keys(price)[0]
        let data = price[sym].USD;
        let tileProps = {
            dashBoardFavorite: sym === this.currentFavorite,
            onClick: () =>{
                this.setState({currentFavorite: sym, historical: null}, this.fetchHistoricalData);
                localStorage.setItem('cryptoInformer',JSON.stringify({
                   ...JSON.parse(localStorage.getItem('cryptoInformer')),
                    currentFavorite: sym
                }))
            }
        }
               return index < 5 ?<CoinTile {...tileProps}> 
                            <CoinTileHeader style={{justify: 'left'}}>
                                {sym}    
                                <PriceDiv negative= {data.CHANGEPCT24HOUR < 0} zero ={data.CHANGEPCT24HOUR == 0}>{numberFormat(data.CHANGEPCT24HOUR)}%</PriceDiv>
                            </CoinTileHeader>
                                <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
                            </CoinTile>:
                            <CoinTileCompact {...tileProps}>
                                {sym}    
                                <PriceDiv negative= {data.CHANGEPCT24HOUR < 0} zero ={data.CHANGEPCT24HOUR == 0}>{numberFormat(data.CHANGEPCT24HOUR)}%</PriceDiv>
                                ${numberFormat(data.PRICE)}
                            </CoinTileCompact>
            })  
    }
    </CoinGrid>, 
    <ChartGrid key={'chartgrid'}><PaddingLight>
        <div>
            <h2 style= {{textAlign: 'center'}}> {this.state.coinList[this.state.currentFavorite].CoinName}</h2>
         <img src={`https://www.cryptocompare.com/${this.state.coinList[this.state.currentFavorite  ].ImageUrl}`} style={{height: '200px', display: 'block', margin: 'auto'}} />
        </div>
    </PaddingLight>
    <PaddingLight>
        <ChartSelector default={'months'} onChange={(event)=>{ 
            this.setState({timeInterval: event.target.value, historical: null}, this.fetchHistoricalData());
            //this.fetchHistoricalData();
            //Have to call this.fetchHistoricalData() in setState. Otherwise, it will fetch previous data
    }}>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
        </ChartSelector>
        {this.state.historical ?
        <ReactHighCharts config={HighChartsConfig.call(this)}/>:<div>{this.loadingHistoricalData()}</div>
        }
    </PaddingLight>
    </ChartGrid>]
}