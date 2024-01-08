import React, { useState } from 'react'
import { settingsItems } from './settingsItems'
import SettingsCard from './settingsCard'

const SettingsMenu = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid gap-x-16 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start">
      {
        settingsItems.map((item) => (
          <SettingsCard item={item} selected={selected} setSelected={setSelected}/>
        ))
      }
    </div>
  )
}

export default SettingsMenu