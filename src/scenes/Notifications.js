import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  withStyles,
  withWidth
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  pagination: {
    padding: theme.spacing(2, 0, 4, 0),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      borderTopColor: theme.palette.divider,
      borderTopStyle: 'solid'
    }
  }
});

class Notifications extends PureComponent {
  state = {
    records: [],
    activeIndex: -1
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 10; i++) {
      records.push({
        title: faker.lorem.sentence(),
        subtitle: faker.lorem.sentence(),
        time: faker.date.past()
      });
    }
    this.setState({ records });
  }

  getControlSize() {
    switch (this.props.width) {
      case 'sm':
      case 'xs':
        return 'small';
      case 'md':
        return 'medium';
      default:
        return 'large';
    }
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={1}>
              <Typography variant="h5">Notifications</Typography>
            </Box>
            <Box>
              <Divider />
              <List disablePadding>
                {this.state.records.map(({ title, subtitle, time }, index) => (
                  <ListItem key={index} disableGutters divider>
                    <Box flex={1}>
                      {!!title && <Typography variant="body1">{title}</Typography>}
                      {!!subtitle && <Typography variant="body2" color="textSecondary">{subtitle}</Typography>}
                      {!!time && <Typography variant="body2" color="textSecondary">{moment(time).fromNow()}</Typography>}
                    </Box>
                    <IconButton onClick={() => this.setState({ activeIndex: index })}>
                      <Close />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Box className={this.props.classes.pagination}>
                <Pagination count={10} size={this.getControlSize()} />
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
      {this.rnederDialog()}
    </div>
  )

  rnederDialog = () => (
    <Dialog
      open={this.state.activeIndex !== -1}
      onClose={() => this.setState({ activeIndex: -1 })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete notification</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Are you sure to delete this notification record?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.setState({ activeIndex: -1 })} color="primary">No</Button>
        <Button onClick={this.onDeleteRecord} color="primary" autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  )

  onDeleteRecord = () => {
    const records = cloneDeep(this.state.records);
    records.splice(this.state.activeIndex, 1);
    this.setState({ records, activeIndex: -1 });
  }
}

export default compose(
  withStyles(styles),
  withWidth()
)(Notifications);