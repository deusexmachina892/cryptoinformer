import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components';
import _ from 'lodash';
import cc from 'cryptocompare';
import NavBar from './NavBar';
import CoinList from './CoinList';


const AppLayout=styled.div`
padding: 20px;
`;

const Content = styled.div`

`; 
const checkFirstVisit = ()=>{
  const cryptoInformerData = localStorage.getItem('cryptoInformer');
  if(!cryptoInformerData){
    return {
      firstVisit: true,
      page: 'settings'
    }
  }
}

const MAX_FAVORITES = 15;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: '',
      favorites:[],
      ...checkFirstVisit()
    }
  }

componentDidMount = () =>{
  this.fetchCoins();
}

fetchCoins = async ()=>{
  let coinList = (await cc.coinList()).Data;
  this.setState({coinList});
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
  this.setState({
    firstVisit: false,
    page: "dashboard"
  });
  localStorage.setItem('cryptoInformer',JSON.stringify({
    favorites: this.state.favorites
  }))
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
         <div onClick={(event)=>this.confirmFavorites()}>
          Confirm Favorites
         </div>
         {CoinList.call(this, true)}
        {CoinList.call(this)}
          
  </div>
}

loadingContent = ()=>{
  if(!this.state.coinList){
    return <div>Loading Coin List..</div>
  }
  
}
  render() {
    return (
      <AppLayout>
        {NavBar.call(this)}
        {this.loadingContent()|| <Content>
        {this.displaySettings() && this.settingsContent()}
        </Content>} 
      </AppLayout>
    );
  }
}

export default App;
