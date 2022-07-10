import { useEffect, useState } from 'react'

const Select = ({ items, name }) => {
  const [selected, setSelected] = useState(items[0])

  useEffect(() => {
    if (window) window[name] = selected.name
  }, [])

  return (
    <select
      name={name}
      value={selected.name}
      onChange={(e) => {
        let temp = e.target.value
        setSelected(temp)
        if (window) window[name] = temp
      }}
      className="form-select mt-1 dark:placeholder:text-white appearance-none rounded border-teal-600 dark:text-white dark:border-gray-300 dark:bg-transparent"
    >
      {items.map((person, _ind) => (
        <option key={_ind} value={person.name}>
          {person.name}
        </option>
      ))}
    </select>
  )
}

export default Select
