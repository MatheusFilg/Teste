import { gql, useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

const GET_CHARACTERS_DETAILS = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      episode{
        name
      }
    }
  }
`

interface GetCharacterDetailResponse {
    id: string
    name: string
    status: string
    image: string
    episode: {
      name: string
    }[]
  }

interface CharacterDetailsProps {
    id: string
}

export function CharacterDetails({id}: CharacterDetailsProps) {
    const [isDetailOpen, setIsDetailsOpen] = useState(false)
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>('')

    const { data: specificCharacterData } = useQuery<{ character: GetCharacterDetailResponse} >(GET_CHARACTERS_DETAILS, {variables: {id: selectedCharacterId } })

    function handleOpenDetails(id: string) {
        setSelectedCharacterId(id)
        setIsDetailsOpen(true)
      }
      
    return (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger className="z-10 -translate-y-16 translate-x-6">
            <Button variant="outline" className='bg-slate-700 text-white p-6 rounded' onClick={() => handleOpenDetails(id)}>
                <span>Ver mais detalhes</span>
            </Button>
        </DialogTrigger>
        <DialogContent className='text-white bg-slate-900 overflow-y-scroll max-h-[90vh]'>
            {specificCharacterData && (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
                <img className='w-32 h-32' src={specificCharacterData?.character.image}/>
                <h1 className="text-2xl font-semibold line-clamp-3 truncate">{specificCharacterData?.character.name}</h1>
            </div>
            <div>
                <h1 className="text-xl font-semibold line-clamp-3 truncate mb-4">Aparições</h1>
                {specificCharacterData?.character.episode.map(episodes => <li>{episodes.name}</li>)}
            </div>
        </div>
        )}
        </DialogContent>
      </Dialog> 
    )
}