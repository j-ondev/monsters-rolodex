import { ChangeEvent, useEffect, useState } from 'react'

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

import { getData } from './utils/data.utils'
import './App.css'

export type Monster = {
  id: string
  name: string
  email: string
}

const App = () => {
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [searchField, setSearchField] = useState('')
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)
  
  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => setMonsters(users))
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }

    fetchUsers()
  })

  useEffect(() => {
    setFilteredMonsters(monsters.filter(
      monster => monster.name.toLocaleLowerCase().includes(searchField))
    )
  }, [monsters, searchField])

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
