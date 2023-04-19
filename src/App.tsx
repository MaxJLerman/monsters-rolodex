import React, { useState, useEffect, ChangeEvent } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import { getData } from './utils/data.utils';

import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
};

// this is a functional component
// as opposed to class components, with functional components the whole function gets called when React needs to update the page
const App = () => {
  const [searchField, setSearchField] = useState(''); // could also be useState<string>('') but as searchField gets initialised with an empty string, TS infers the type as string
  const [monsters, setMonsters] = useState<Monster[]>([]); // must update the useState hook with the correct type
  const [filteredMonsters, setFilteredMonsters] = useState(monsters); // therefore no explicit type definition is needed here because the type is inferred from the monsters array in the line above

  // useEffect only needs to be run once as empty array is passed meaning nothing will change; therefore never triggering the useEffect function again
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      setMonsters(users);
    };

    fetchUsers(); // make sure to call the function inside the useEffect if it's defined as an async function
  }, []);
    
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => { 
      return monster.name.toLocaleLowerCase().includes(searchField); 
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchField_string = event.target.value.toLocaleLowerCase();
    setSearchField(searchField_string);
  };

  return (
    <div className="App">
    <h1 className="app-title">Monsters Rolodex</h1>
    <SearchBox className="monsters-search-box" onChangeHandler={onSearchChange} placeholder="search monsters" />
    <CardList monsters={filteredMonsters} />
    </div>
  );
};


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
