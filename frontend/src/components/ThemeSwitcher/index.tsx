import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useCurrentTheme } from "../../hooks/useTheme";
import { Container } from "./style";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ThemeSwitcher(): JSX.Element {

    const [enabled, setEnabled] = useState(false)
    const { toggleCurrentTheme } = useCurrentTheme()

    return (
        <Container>
            <Switch
                checked={enabled}
                onChange={() => {
                    setEnabled(prevEnabled => !prevEnabled)
                    toggleCurrentTheme()
                }}
                className={enabled ? 'switch switchEnabled' : 'switch switchNotEnabled'}
            >
                <span className={enabled ? 'iconEnabled' : 'iconNotEnabled'}>
                    {!enabled ? <LightModeIcon /> : <DarkModeIcon />}
                </span>
            </Switch>
        </Container>
    )
}