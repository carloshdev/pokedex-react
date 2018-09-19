import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Input, Label, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class App extends Component {
  
constructor() {
  super();
  this.state = {
    vetId: ['squirtle', 6, 25, 132, 249],
    vetPokemon: [],
    pokemonSelecionado:null,
    idSelecionado:-1
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

changePokemon = (id) =>{
  if(id == -1){
    this.setState({idSelecionado: id});
    this.setState({pokemonSelecionado: null});
    return;
  }
  this.state.vetPokemon.map((pokemon) => { 
    
    if(pokemon.id == id){
      this.setState({pokemonSelecionado: pokemon});
      this.setState({idSelecionado: pokemon.id});
    }
  
})             
  
};

  render() {
    if (this.state.vetPokemon.length < this.state.vetId.length-1){
      return <div>Carregando...</div>
  }

    return (
      <div className="App">
          <div style={{width:'50%'}}>
          <Label for="select">Selecione um Pokemon</Label> 
            <Input type="select" name="select" value={this.state.idSelecionado} id="select" onChange={(input)=>this.changePokemon(input.target.value)}>
            <option key={-1} value={-1} >Selecione um Pokemon</option>
            {
              this.state.vetPokemon.map((pokemon) => { 
                  return <option key={pokemon.id} value={pokemon.id} >{pokemon.name}</option>;
              })             
            } 
          </Input> 
          </div>
          
          <div style={{width:'50%'}}>
          {
            
            this.state.pokemonSelecionado ?
              <Card>
                <CardImg top style={{width:"50%"}} src={this.state.pokemonSelecionado.sprites.front_default} alt="Card image cap" />
                <CardBody>
                <CardTitle>{this.state.pokemonSelecionado.name.toUpperCase()} - {this.state.pokemonSelecionado.id}</CardTitle>
                <CardSubtitle>{this.state.pokemonSelecionado.types[0].type.name.toUpperCase()}</CardSubtitle>
                
                </CardBody>
                </Card> 
                :
                ""
          }
                 
          </div>
           
      </div>
    );
  }
}

export default App;
