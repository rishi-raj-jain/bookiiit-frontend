const SortComponent = ({ selectedValue, setSelectedValue, setSortType, selectedStatus, setSelectedStatus }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <select
        value={selectedValue}
        onChange={(e) => {
          let temp = e.target.value
          setSelectedValue(temp)
          if (temp.toLowerCase() === 'oldest') {
            setSortType(2)
          } else {
            setSortType(1)
          }
        }}
        className="mt-1 w-[100px] appearance-none rounded border border-teal-600 p-2 outline-none dark:border-gray-200 dark:bg-transparent dark:text-gray-200"
      >
        <option value="Sort By">Sort By</option>
        <option value="Latest">Latest</option>
        <option value="Oldest">Oldest</option>
      </select>
      <select
        value={selectedStatus}
        onChange={(e) => {
          let temp = e.target.value
          setSelectedStatus(temp)
        }}
        className="mt-1 w-[100px] appearance-none rounded border border-teal-600 p-2 outline-none dark:border-gray-200 dark:bg-transparent dark:text-gray-200"
      >
        <option value="">Status</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  )
}

export default SortComponent
