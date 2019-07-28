import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './main.css'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Home from './Home';
import Favoritos from './Favoritos';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Home','Favoritos'].map((text, index) => (
          <Link to={(text == "Home")? '/': text}>
            <ListItem button key={text}>
            
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            
            </ListItem>
          </Link>
        ))}
      </List>
      
    </div>
  );


  return (
    <Router>
      <div>
        <Button onClick={toggleDrawer('left', true)}>
          <div class='bar'></div>
          <div class='bar'></div>
          <div class='bar'></div>
        </Button>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>

        <Route path="/" exact component={Home} />
        <Route path="/favoritos/" component={Favoritos} />
        
      </div>
    </Router>
  );
}