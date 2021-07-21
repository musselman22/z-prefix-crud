import Tasks from "./Components/Tasks";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blueGrey, yellow } from '@material-ui/core/colors';
import NavBar from "./Components/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: '#11cb5f',
    },
    warning: {
      main: yellow[400]
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Tasks />
    </ThemeProvider>
  );
}

export default App;
