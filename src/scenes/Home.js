import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  content: {
    height: theme.spacing(15)
  }
})

class Home extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <div className={this.props.classes.content} />
      <Footer />
    </div>
  )
}

export default withStyles(styles)(Home);