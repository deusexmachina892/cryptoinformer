import React from 'react';
import styled, {css}from 'styled-components';


const NavBar =styled.div`
display: grid;
grid-template-columns: 200px auto 100px 100px;
`;

const Logo = styled.div`
font-size: 1.5em;
`;
const ControlButton = styled.div`
cursor: pointer;
${(props) => props.active && css`
  text-shadow: 0px 0px 60px #03ff03;
  color: #BC8B5E;  
`}`;
 
export default function(){
    return  <NavBar>
    <Logo>Crypto Informer</Logo>
    <div></div>
    {!this.state.firstVisit &&
      (<ControlButton onClick={()=>{this.setState({page:'dashboard'})}} active={this.displayDashBoard()}>
         Dashboard
      </ControlButton>)}
    
    <ControlButton onClick={()=>{this.setState({page:'settings'})}} active={this.displaySettings()}>
      Settings
    </ControlButton>
  </NavBar>
}