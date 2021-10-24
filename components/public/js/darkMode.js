// let activeModeIsDarkMode = false;

// function triggerSwitchTheme(){
//     loadDarkModeFromLocalStorage();
//     switchActiveMode();
//     saveDarkModeToLocalStorage();

//     logTriggerSwitch();
//     setAllThemeProperties();
//     setTableClassAttributesForTheme();
//     setDarkModeButton();

// }

// function loadThemeStyleOnLoad(){
//     loadDarkModeFromLocalStorage();
//     logTriggerSwitch();
//     setAllThemeProperties();
//     setTableClassAttributesForTheme();

//     setDarkModeButton();
// }

// function switchActiveMode() {
//     activeModeIsDarkMode = !activeModeIsDarkMode;
// }

// function logTriggerSwitch() {
//     console.log(
//         '%c Switched to '    + (activeModeIsDarkMode ? 'dark' : 'light'  ) + ' mode',
//         'background-color:'  + (activeModeIsDarkMode ? 'black' : 'yellow') + '; ' +
//         'color:'             + (activeModeIsDarkMode ? 'white' : 'black' ) + '; font-weight:bold; ');
// }

// function setAllThemeProperties(){
//     setThemeProperty('--main-bg-color',                     ( activeModeIsDarkMode ? 'black'  : 'white'  ));
//     setThemeProperty('--main-text-color',                   ( activeModeIsDarkMode ? 'white'  : 'black'  ));
//     setThemeProperty('--main-hover-bg-color',               ( activeModeIsDarkMode ? 'white'  : 'black'  ));
//     setThemeProperty('--main-hover-text-color',             ( activeModeIsDarkMode ? 'black'  : 'white'  ));
//     setThemeProperty('--main-hover-highlight-row-color',    ( activeModeIsDarkMode ? 'green'  : 'yellow' ));
// }

// function setThemeProperty(property, color) {
//     document.documentElement.style.setProperty(property, color);
// }

// function setDarkModeButton() {
//     document.getElementById('darkModeButton').textContent = (activeModeIsDarkMode ? "Hell" : "Dunkel");
// }

// function setTableClassAttributesForTheme() {
//     domSetAttribute(
//        getTable(),
//         "class",
//         'table table-xl'
//         + (activeModeIsDarkMode ? ' table-dark' : ' table-light'));
// }

// function saveDarkModeToLocalStorage() {
//     localStorage.setItem("isDarkMode", String(activeModeIsDarkMode));
// }

// function loadDarkModeFromLocalStorage() {
//     if (localStorage.getItem('isDarkMode') !== null) {
//         activeModeIsDarkMode = localStorage.getItem("isDarkMode").includes("true");
//     } else {
//         activeModeIsDarkMode = false;
//     }
// }
