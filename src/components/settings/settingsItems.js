import { Palette, Ligature, UnlockKeyhole, AlertCircle, Trash2 } from 'lucide-react';
import SettingsSwitch from './settingsSwitch';
import SettingsDeleteButton from './settingsDeleteButton';
import SettingsFontSelector from './settingsFontSelector';

export const settingsItems = [
    {
        index: 0,
        title: "Appereance",
        subtitle: "Theme Mode",
        icon: Palette,
        content: SettingsSwitch
    },
    {
        index: 1,
        title: "Font Size",
        subtitle: "Set the Font Size",
        icon: Ligature,
        content: SettingsFontSelector
    },
    {
        index: 2,
        title: "Security",
        subtitle: "Configure Password, PIN, etc",
        icon: UnlockKeyhole,
        content: SettingsSwitch
    },
    {
        index: 3,
        title: "About Us",
        subtitle: "Find out more about Posly",
        icon: AlertCircle,
        content: SettingsDeleteButton
    },
    {
        index: 4,
        title: "Delete Account",
        subtitle: "Delete your account permanently",
        icon: Trash2,
        content: SettingsDeleteButton
    }
];