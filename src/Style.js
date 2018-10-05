const theme = 'dark';
const lightTheme = theme === 'light';


export const color = lightTheme?'white':'#050505';
export const color2 = lightTheme?'white':'#262525';
export const color3 = '#d8cf6c';

if(lightTheme){
    document.body.style.background = 'white';
    document.body.style.color = 'black';
}

export const blackBackground = `background-color: ${color}`;
export const lightBackground = `background-color: ${color2}`;
export const yellowBackground = `background-color: ${color3}`;

export const fontColorWhite = 'color: #fff';
export const fontColorGold = 'color: #BC8B5E';
export const fontColorBlue = 'color: #3B9FAE';
export const subtleBoxShadow = `box-shadow: 5px 10px 8px ${lightTheme?'#a9b6ff': '#383535'}`;
export const goldBoxShadow = 'box-shadow: 0px 0px 4px 2px #BC8B5E';
export const redBoxShadow = 'box-shadow: 0px 0px 2px 2px #e41111';

export const fontSizeBig = 'font-size: 2em';
export const fontSize = 'font-size: 1.5em';
export const fontSize2 = 'font-size: 1.0em';
export const fontSize3 = 'font-size: .75em';

export const textAlignCenter = 'text-align: center';