import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Input, Label } from 'reactstrap';

class App extends Component {
  
constructor() {
  super();
  this.state = {
    vetId: [7, 6,25,132,249],
    vetPokemon: []
  }  
  this.getPokeApi();
}

getPokeApi = () => {
this.state.vetId.forEach(id => {
  let vet=[];
  axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then(resposta =>{
      this.state.vetPokemon.push(resposta.data);
      this.setState({vetPokemon:this.state.vetPokemon });
    }) .catch(erro => {
      if(erro){
          console.log(erro);
      }
  })
  
});
    //teste
    /*this.vetPokemon[1] = axios.get("http://pokeapi.co/api/v2/pokemon/25")
    this.vetPokemon[2] = axios.get("http://pokeapi.co/api/v2/pokemon/6")
    this.vetPokemon[3] = axios.get("http://pokeapi.co/api/v2/pokemon/132")
    this.vetPokemon[4] = axios.get("http://pokeapi.co/api/v2/pokemon/249")
*/
}

  render() {
    return (
      <div className="App">
        
        <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={(value)=>alert(value.value)}>
            {
              this.state.vetPokemon.map((pokemon) => {
                  return <option >{pokemon.name}</option>;
              })
            } 
          </Input>
        
      </div>
    );
  }
}

export default App;
