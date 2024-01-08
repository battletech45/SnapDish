import React from "react";
import Switch from "react-switch";
import { Moon, Sun } from "lucide-react";

const SettingsSwitch = ({ isOn, setIsOn }) => {
  return (
    <Switch
      checked={isOn}
      onChange={() => setIsOn(!isOn)}
      handleDiameter={28}
      offColor="#393C49"
      onColor="#393C49"
      offHandleColor="#9288E0"
      onHandleColor="#9288E0"
      height={40}
      width={70}
      borderRadius={6}
      uncheckedIcon={
        <div className="flex items-center justify-center h-full">
          <Moon color="#FFB572" size={20} />
        </div>
      }
      checkedIcon={
        <div className="flex items-center justify-center h-full">
          <Sun color="yellow" size={20} />
        </div>
      }
      uncheckedHandleIcon={
        <div className="flex items-center justify-center h-full">
          <Sun color="yellow" size={20} />
        </div>
      }
      checkedHandleIcon={
        <div className="flex items-center justify-center h-full">
          <Moon color="#FFB572" size={20} />
        </div>
      }
    />
  );
};

export default SettingsSwitch;
