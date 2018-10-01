import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components';
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

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: '',
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

firstVisitMessage = ()=>{if(this.state.firstVisit){
  return <div>Welcome to Crypto Informer!</div>
}}

confirmFavorites = ()=>{
  localStorage.setItem('cryptoInformer', 'test');
  this.setState({
    firstVisit: false,
    page: "dashboard"
  });
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
  </div>
}

loadingContent = ()=>{
  return <div>Loading Coin List..</div>
}
  render() {
    return (
      <AppLayout>
        {NavBar.call(this)}
        {this.loadingContent()}
        <Content>
        {this.displaySettings() && this.settingsContent()}
        {this.displayDashBoard() && CoinList.call(this)}
        </Content>
      </AppLayout>
    );
  }
}

export default App;
