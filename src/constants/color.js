import { grey, purple, red } from "@material-ui/core/colors/";
import { createMuiTheme } from '@material-ui/core/styles';



export const navColor = grey[900];
export const odoo = purple[200];
export const primary = red[500];


export const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#70c4bc',
          main: '#4DB6AC',
          dark: '#357f78',
          contrastText: '#000',
        },
        secondary: {
          light: '#6573c3',
          main: '#4FC3F7',
          dark: '#4FC3F7',
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