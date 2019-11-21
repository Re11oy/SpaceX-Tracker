import 'styled-components/native';
import { ITheme } from './src/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends ITheme {}
}
