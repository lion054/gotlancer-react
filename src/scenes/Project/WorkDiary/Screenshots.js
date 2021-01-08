import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  MenuItem,
  Select,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
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
  },
  capture: {
    width: '100%',
    borderRadius: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      borderRadius: theme.spacing(0.5)
    }
  }
});

const TitleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white
  }
}))(Button);

class Screenshots extends PureComponent {
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
    for (let i = 0; i < 2; i++) {
      const captures = [];
      for (let j = 0; j < 6; j++) {
        captures.push({
          url: faker.image.image(),
          createdAt: faker.date.past()
        });
      }
      tasks.push({
        title: faker.lorem.sentence(),
        startedAt: faker.date.past(),
        endedAt: faker.date.past(),
        duration: '1hr 00min',
        captures
      });
    }
    this.setState({ people, tasks });
  }

  render = () => (
    <Box>
      <Box mt={2}>
        {this.renderToolbar()}
      </Box>
      <Box mt={2}>
        {this.state.tasks.map(({ title, startedAt, endedAt, duration, captures }, i) => (
          <Box key={i}>
            <Box className={this.props.classes.title} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">{title}</Typography>
              <TitleButton variant="text">Edit Title</TitleButton>
            </Box>
            {this.props.width === 'xs' || this.props.width === 'sm' ? (
              <Box mt={1} whiteSpace="break-spaces">
                <Grid container justify="space-around">
                  <Typography variant="body2">Started at: {moment(startedAt).format('LT')}</Typography>
                  <Typography variant="body2">Ended at: {moment(endedAt).format('LT')}</Typography>
                  <Typography variant="body2">Duration: {duration}</Typography>
                  <Typography variant="body2">Paused: 3 times  <Link href="#">See Paused History</Link></Typography>
                </Grid>
              </Box>
            ) : (
              <Box className={this.props.classes.outerMargin} pt={1}>
                <Grid container>
                  <Grid item md={2}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2">Started at: {moment(startedAt).format('LT')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2">Ended at: {moment(endedAt).format('LT')}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2">Duration: {duration}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body2" align="right">Paused: 3 times  <Link href="#">See Paused History</Link></Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            <Box className={this.props.classes.outerMargin} mt={2}>
              <Grid container>
                {captures.map(({ url, createdAt }, j) => (
                  <Grid key={j} item xl={2} lg={3} md={4} sm={6} xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      <img alt="" src={url} className={this.props.classes.capture} />
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">{moment(createdAt).format('LT')}</Typography>
                        <Button variant="text">Delete</Button>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
      <CompactPagination />
    </Box>
  )

  renderToolbar = () => (
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
  )

  renderPlaceholder = () => (
    <div style={{ height: 36 }} />
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Screenshots);