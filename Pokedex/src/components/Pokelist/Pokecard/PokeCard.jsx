import React from 'react'

function PokeCard({singlePokemon}) {
  return (
    <div className="bg-gray-100 p-5 m-5 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-600">
        {singlePokemon.name.toUpperCase()}
      </h1>
      <p className="text-lg font-semibold text-gray-400">
        URL:{" "}
        <a
          href={singlePokemon.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {singlePokemon.url}
        </a>
      </p>
    </div>
  )
}

export default PokeCard