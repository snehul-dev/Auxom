import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Backbutton() {
    const navigate = useNavigate()
  return (

    <button  onClick={()=>navigate(-1)}
    className="px-3 py-1 bg-black text-white rounded ms-5 mt-3 hover:bg-gray-900"> ← Back</button>
  )
}

export default Backbutton