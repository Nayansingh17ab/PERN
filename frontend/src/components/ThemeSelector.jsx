import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = (selectedTheme) => {
    console.log("Clicked theme:", selectedTheme);
    console.log("Current theme before:", theme);
    
    setTheme(selectedTheme);
    
    console.log("Current theme after:", theme);
    console.log("data-theme attribute:", document.documentElement.getAttribute("data-theme"));
    
    // Close the dropdown
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER BUTTON */}
      <div tabIndex={0} role="button" className="btn btn-ghost gap-1">
        <PaletteIcon className="size-5" />
        <span className="hidden md:inline">Theme</span>
      </div>

      {/* DROPDOWN MENU */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow-lg max-h-96 overflow-y-auto"
      >
        {THEMES.map((themeOption) => (
          <li key={themeOption.name}>
            <button
              type="button"
              className={`flex items-center gap-2 ${
                theme === themeOption.name ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleThemeChange(themeOption.name);
              }}
            >
              <span>{themeOption.label}</span>
              {/* THEME COLOR PREVIEW */}
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-3 rounded-full border border-base-content/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSelector;
