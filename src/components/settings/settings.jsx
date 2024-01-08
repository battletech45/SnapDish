import React from "react";
import SettingsMenu from "./settingsMenu";

const Settings = () => {
  return (
    <section className="flex grow">
      <section className="grow flex flex-col ml-24 h-screen p-8 overflow-y-scroll">
        <h1 className="font-barlow text-3xl font-semibold leading-10 text-white mb-8">Settings</h1>
        <SettingsMenu />
      </section>
      
    </section>
  );
};

export default Settings;
