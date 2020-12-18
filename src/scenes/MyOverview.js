import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
})

class MyOverview extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <div style={{ height: 100 }} />
      <Footer />
    </div>
  )
}

export default withStyles(styles)(MyOverview);