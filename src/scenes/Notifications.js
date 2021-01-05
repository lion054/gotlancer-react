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
  withStyles
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import faker from 'faker';

import Header from '../components/Header';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
})

class Membership extends PureComponent {
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
                      {!!subtitle && <Typography variant="body2">{subtitle}</Typography>}
                      {!!time && <Typography variant="body2">{moment(time).fromNow()}</Typography>}
                    </Box>
                    <IconButton onClick={() => this.setState({ activeIndex: index })}>
                      <Close />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
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

export default withStyles(styles)(Membership);