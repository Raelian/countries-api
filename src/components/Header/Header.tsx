import {useTheme} from "../../ThemeProvider";
import { Moon, Sun } from 'lucide-react';
import "./Header.scss";

const Navigation = () => {
    const {theme, toggleTheme} = useTheme();

    const isLight = theme === 'light';
    const ThemeIcon = isLight ? Moon : Sun;
    const label = isLight ? 'Dark' : 'Light';

    return(
        <div className="nav-container">
            <h2>Where in the world?</h2>
            <button className="toggle-btn" onClick={toggleTheme}>
                <ThemeIcon size={19}/>
                {label} Mode
            </button>
        </div>
    )
}

export default Navigation;