// TODO THEME NOT WORKING
const colors = {
  cardBackground: '#42446f',
  inactive: '#8183a5'
};

const fontSizes = ['1.2rem', '1.4rem'];

interface ITheme {
  fontSizes: string[];
  colors: { [key in keyof typeof colors]: string };
}

const theme: ITheme = {
  fontSizes,
  colors
};

export { theme, ITheme };
