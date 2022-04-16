import { useEffect, useState } from 'react'

import './App.css'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

const App = () => {
  const [monsters, setMonsters] = useState([])
  const [searchField, setSearchField] = useState('')
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
  }, [])

  useEffect(() => {
    setFilteredMonsters(monsters.filter(
      monster => monster.name.toLocaleLowerCase().includes(searchField))
    )
  }, [monsters, searchField])

  const onSearchChange = event => {
    const searchString = event.target.value.toLocaleLowerCase()
    setSearchField(searchString)
  }

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      
      <SearchBox
        className='search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
