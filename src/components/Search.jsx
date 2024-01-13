
function Search({search, setSearch}) {
  return (
    <div>
        <input 
            type='text' 
            placeholder='Pesquisar' 
            className='bg-zinc-200 p-3 rounded-md outline-green-500'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default Search