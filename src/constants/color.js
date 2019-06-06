import { grey, purple, red } from "@material-ui/core/colors/";
import { createMuiTheme } from '@material-ui/core/styles';



export const navColor = grey[900];
export const odoo = purple[200];
export const primary = red[500];


export const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#f6685e',
          main: '#9c27b0',
          dark: '#aa2e25',
          contrastText: '#000',
        },
        secondary: {
          light: '#6573c3',
          main: '#3f51b5',
          dark: '#2c387e',
          contrastText: '#000',
        },
        error: {
          light: '#eb5260',
          main: '#e62739',
          dark: '#a11b27',
          contrastText: '#000',
        },
    },
});