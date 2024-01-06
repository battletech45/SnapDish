import React, { useState } from 'react'
import { settingsItems } from './settingsItems'
import SettingsCard from './settingsCard'

const SettingsMenu = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col py-8 rounded-lg bg-[#1F1D2B] gap-4">
      {
        settingsItems.map((item) => (
          <SettingsCard item={item} selected={selected} setSelected={setSelected}/>
        ))
      }
    </div>
  )
}

export default SettingsMenu