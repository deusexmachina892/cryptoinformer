import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components';
import _ from 'lodash';
import cc from 'cryptocompare';
import NavBar from './NavBar';
import DashBoard from './DashBoard';
import CoinList from './CoinList';
import Search from './Search';
import {ConfirmButton} from './Buttons';
import fuzzy from 'fuzzy';
import moment from 'moment';

const AppLayout=styled.div`
padding: 20px;
`;

const Content = styled.div`

`; 
const CenterDiv= styled.div`
  display: grid;
  justify-content: center;

`;

const MAX_FAVORITES = 15;
const TIME_UNITS = 10;


const getInitialState = ()=>{
  const cryptoInformerData = JSON.parse(localStorage.getItem('cryptoInformer'));
  if(!cryptoInformerData){
    return {
      firstVisit: true,
      page: 'settings'
    }
  }
  let {favorites, currentFavorite} = cryptoInformerData;
  return {
    favorites,
    currentFavorite
  }
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: 'dashboard',
      favorites:['BTC'],
      timeInterval: 'months',
      ...getInitialState()
    }
  }

componentDidMount = () =>{
  this.fetchCoins();
  this.fetchPrices();
  this.fetchHistoricalData()
}

fetchHistoricalData = async () =>{
  if(this.state.currentFavorite){
    let results = await this.historicalData();
    let historical = [{
      name: this.state.currentFavorite,
      data: results.map((ticker, index) => [moment().subtract({[this.state.timeInterval]: (TIME_UNITS - index)}).valueOf(), ticker.USD])
    }];
    this.setState({historical});
  }
}
historicalData = () =>{
  let promises = [];
  for (let units = TIME_UNITS; units > 0; units--){
    promises.push(cc.priceHistorical(this.state.currentFavorite, ['USD'], moment().subtract({[this.state.timeInterval]: units}).toDate()));
  }
  return Promise.all(promises);
}

fetchPrices = async () => {
  let prices;
  try{
    prices = await this.prices();
  }catch(err){
    this.setState({error: true});
  }
  this.setState({prices});
}
prices = async () =>{
  let returnData = [];
  for(let i=0; i< this.state.favorites.length; i++){
    try{
    let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
    returnData.push(priceData);
    }catch(err){
        console.warn('price fetch error', err)
    }
  }
  return returnData;
}

fetchCoins = async ()=>{
  let coinList = (await cc.coinList()).Data;
  this.setState({coinList, favorites: this.validatedFavorites(coinList)});
}
validateFavorites = (coinList) =>{
  let validatedFavorites = [];
  this.state.favorites.forEach((favorite)=>{
    if(coinList[favorite]){
      validatedFavorites.push(favorite);
    }
  });
  return validatedFavorites;
}

addCoinToFavorites = (coinKey) => {
  let favorites = [...this.state.favorites];
  if(favorites.length < MAX_FAVORITES){
    favorites.push(coinKey);
    this.setState({favorites});
  }

}
removeCoinFromFavorites = (coinKey) => {
  let favorites = [...this.state.favorites];  
  this.setState({favorites: _.pull(favorites, coinKey)});
}

isInFavorites = (coinKey) => {
  return _.includes(this.state.favorites, coinKey);
}

firstVisitMessage = ()=>{if(this.state.firstVisit){
  return <div>Welcome to Crypto Informer!</div>
}}

confirmFavorites = ()=>{
  let currentFavorite = this.state.favorites[0] 
  this.setState({
    firstVisit: false,
    page: "dashboard",
    prices: null,
    currentFavorite,
    historical: null,
  });
  this.fetchPrices();
  this.fetchHistoricalData();
  localStorage.setItem('cryptoInformer',JSON.stringify({
    favorites: this.state.favorites,
    currentFavorite
  }))
}

handleFilter = _.debounce((inputValue)=>{
  let coinSymbols = Object.keys(this.state.coinList);

  let coinNames = coinSymbols.map(sym => this.state.coinList[sym].CoinName);

  let allStringsToSearch = coinSymbols.concat(coinNames);

  let fuzzyResults = fuzzy.filter(inputValue, allStringsToSearch, {}).map(result => result.string);
  
  let filteredCoins = _.pickBy(this.state.coinList, (result, symKey)=>{
      let coinName = result.CoinName;

      return _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName);
  });
    this.setState({filteredCoins});
}, 500);

filterCoin = (event)=>{
  let inputValue = _.get(event, 'target.value');
  if(!inputValue){
    this.setState({
      filteredCoins: null
    });
    return;
  }
  this.handleFilter(inputValue); 
}

displayDashBoard= ()=>{
  return this.state.page === "dashboard"
}

displaySettings= ()=>{
  return this.state.page === "settings"
}
settingsContent = ()=>{
  return <div>
     {this.firstVisitMessage()}
         <CenterDiv>
              <ConfirmButton onClick={(event)=>this.confirmFavorites()}>
              Confirm Favorites
            </ConfirmButton>
         </CenterDiv>
         {CoinList.call(this, true)}
         {Search.call(this)}
        {CoinList.call(this)}
          
  </div>
}
loadingHistoricalData= ()=>{
  if(!this.state.historical){
    return <div>Loading Historical Data..</div>
  }
}
dashboardContent = ()=>{
  if(this.state.favorites.length === 0){
    return <div>No favorites chosen..</div>
  } else {
    console.log('ok');
  return DashBoard.call(this);
  }
}

loadingContent = ()=>{
  if(!this.state.coinList){
    return <div>Loading Coin List..</div>
  }
  if(!this.state.firstVisit && !this.state.prices){
    return <div>Loading Prices..</div>
  }
  
}
  render() {
    return (
      <AppLayout>
        {NavBar.call(this)}
        {this.loadingContent()|| <Content>
        {this.displaySettings() && this.settingsContent()}
        {this.displayDashBoard() && this.dashboardContent()}
        </Content>} 
      </AppLayout>
    );
  }
}

export default App;
