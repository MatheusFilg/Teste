import { GetCharactersResponse } from "@/app";

export function CharacterCard({ name, status, image }: GetCharactersResponse) {
    return (
        <div className="bg-slate-500 p-6 rounded gap-2 flex flex-col items-center w-56 h-64 z-0">
            <img className='w-24 h-24' src={image}/>
            <h1 className="text-lg font-semibold line-clamp-3 truncate">{name}</h1>
            <p>{status}</p>
        </div>
    )
}