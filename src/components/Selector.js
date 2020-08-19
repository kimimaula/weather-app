import React, { useState, useEffect } from 'react'

const CustomSelect = ({ parentOptionList }) => {
  const [selectedText, setSelectedText] = useState('')
  const [showOptionList, setShowOptionList] = useState(false)
  const [optionsList, setOptionsList] = useState([])

  useEffect(() => {
    setOptionsList(parentOptionList)
  }, [parentOptionList])

  return (
    <div >
      <div
      >
        {selectedText}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {showOptionList.map(option => {
            return (
              <li key={option.name}>
                {option.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
