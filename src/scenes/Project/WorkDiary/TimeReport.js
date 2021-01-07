import React, { PureComponent } from 'react';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import faker from 'faker';
import { compose } from 'redux';

import CompactPagination from '../../../components/CompactPagination';

const styles = (theme) => ({
  root: {},
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: theme.spacing(1)
  },
  title: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0.5)
  },
  outerMargin: {
    margin: theme.spacing(-2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(-1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

class TimeReport extends PureComponent {
  state = {
    people: [],
    activePerson: '',
    date: null,
    tasks: []
  }

  componentDidMount() {
    const people = [];
    for (let i = 0; i < 5; i++) {
      people.push({
        avatar: faker.image.image(),
        name: faker.name.findName()
      });
    }
    const tasks = [];
    for (let i = 0; i < 10; i++) {
      tasks.push({
        title: faker.lorem.sentence(),
        duration: '1hr 00min',
        invoiceStatus: faker.random.boolean() ? 'Used' : 'Not used'
      });
    }
    this.setState({ people, tasks });
  }

  render = () => (
    <Box>
      <Box mt={2}>
        <Grid container justify="space-around">
          <Box>
            <Box mb={1}>
              <Typography variant="subtitle1">Select Freelancer</Typography>
            </Box>
            <Select
              margin="dense"
              variant="outlined"
              placeholder="Select one"
              style={{
                width: 280
              }}
              value={this.state.activePerson}
              onChange={(e) => {
                console.log(e.target);
                this.setState({ activePerson: e.target.value });
              }}
              displayEmpty
              renderValue={!!this.state.activePerson ? undefined : this.renderPlaceholder}
            >
              {this.state.people.map((person, index) => (
                <MenuItem key={index} value={index + 1}>
                  <Box display="flex" alignItems="center">
                    <img alt="" src={person.avatar} className={this.props.classes.avatar} />
                    <Box flex={1}>
                      <Typography variant="body2" component="span">{person.name}</Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Box mb={1}>
              <Typography variant="subtitle1">Select Date</Typography>
            </Box>
            <KeyboardDatePicker
              inputVariant="outlined"
              format="MM/DD/YYYY"
              clearable
              disableFuture
              value={this.state.date}
              onChange={(m) => {
                if (m) {
                  console.log(m.toDate());
                  this.setState({ date: m.toDate() });
                } else {
                  this.setState({ date: null });
                }
              }}
            />
          </Box>
        </Grid>
      </Box>
      <Box mt={2}>
        <Divider />
        <List disablePadding>
          <ListItem disableGutters divider>
            <Box className={this.props.classes.outerMargin} flex={1}>
              <Grid container>
                <Grid item md={8}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="subtitle2">Task Title</Typography>
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="subtitle2">Time Tracked</Typography>
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="subtitle2">Used for Invoice</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </ListItem>
          {this.state.tasks.map(({ title, duration, invoiceStatus }, index) => (
            <ListItem key={index} disableGutters divider>
              <Box className={this.props.classes.outerMargin} flex={1}>
                <Grid container>
                  <Grid item md={8}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2">{title}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2">{duration}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2">{invoiceStatus}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <CompactPagination />
    </Box>
  )

  renderPlaceholder = () => (
    <div style={{ height: 36 }} />
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(TimeReport);