import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.common.white
  }
})

class MyOverview extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
    </div>
  )
}

export default withStyles(styles)(MyOverview);