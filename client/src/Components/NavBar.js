import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Task Master
        </Typography>
      </Toolbar>
    </AppBar>
  );
}