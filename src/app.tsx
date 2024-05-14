import { gql, useQuery } from '@apollo/client'
import './global.css'
import { CharacterCard } from './components/character-card'
import { CharacterDetails } from './components/character-details'

const GET_CHARACTERS = gql`
query {
  characters {
    results {
      id
      name
      status
      image
      episode {
        name
      }
    }
  }
}
`



export interface GetCharactersResponse {
  id: string
  name: string
  status: string
  image: string
}



export function App() {
  const { data: charactersData } = useQuery<{characters:{results: GetCharactersResponse[]} }>(GET_CHARACTERS)

  return (
    <div className='grid lg:grid-cols-5 grid-cols-3'>
        {charactersData?.characters.results.map(character => 
        <div className='text-white py-8 px-6'>
          <CharacterCard image={character.image} name={character.name} status={character.status} id={character.id} />
          <CharacterDetails id={character.id} />
        </div>
        )}
    </div>
  )
}


