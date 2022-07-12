import { useState, useEffect } from 'react';

import './App.css';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

// this is a functional component
// as opposed to class components, with functional components the whole function gets called when React needs to update the page
const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);

  // useEffect only needs to be run once as empty array is passed meaning nothing will change; therefore never triggering the useEffect function again
  useEffect(() =>
  {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
        .then((users) => setMonsters(users));
  }, [])

  const onSearchChange = (event) =>
  {
    const searchField_string = event.target.value.toLocaleLowerCase();
    setSearchField(searchField_string);
  }

  const filteredMonsters = monsters.filter((monster) =>
  {
    return monster.name.toLocaleLowerCase().includes(searchField); // returns true if name contains search-box value
  });

  return(
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="search monsters" />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

/*
// below is a class component representation

import { Component } from 'react';

class App extends Component
{
  // when writing constructor() { } method, MUST include super()
  // constructor method always runs first
  constructor()
  {
    super();

    this.state = 
    {
      monsters: [],
      searchField: '',
    };
  }

  // componentDidMount method runs third
  componentDidMount()
  {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
        .then((users) => this.setState(
          () => 
          {
            return { monsters: users }
          }
        ));
  }

  onSearchChange = (event) => 
  {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => 
    {
      return { searchField };
    })
  }
  
  // render method runs second as it fills the page with the 'default template' of the code
  // method is run again (last) as the page is re-rendered with the updated components changed in componentDidMount method
  render() // gets called every time React needs to update the DOM i.e. whever setState() is called
  {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // instead of trying to modify the old monsters array, create a new one to filter out unwanted elements = immutability
    const filteredMonsters = monsters.filter((monster) =>
    {
      return monster.name.toLocaleLowerCase().includes(searchField); // returns true if name contains search-box value
    });

    return(
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="search monsters" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
*/

export default App;
