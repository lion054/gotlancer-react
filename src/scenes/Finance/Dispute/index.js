import React, { PureComponent } from 'react';
import {
  Box,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { CheckCircle, Lock } from '@material-ui/icons';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

import Header from '../../../components/Header';
import CommentRoom from '../../../components/CommentRoom';
import Create from './Create';
import SideBar from './SideBar';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
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
})

class Dispute extends PureComponent {
  state = {
    activeTab: 0,
    creator: {},
    accused: {},
    admin: {},
    comments: []
  }

  componentDidMount() {
    const creator = {
      id: uuidv4(),
      avatar: faker.image.image(),
      name: faker.name.findName()
    };
    const accused = {
      id: uuidv4(),
      avatar: faker.image.image(),
      name: faker.name.findName()
    };
    const admin = {
      id: uuidv4(),
      avatar: faker.image.image(),
      name: faker.name.findName(),
      isAdmin: true
    };
    const comments = [];
    for (let i = 0; i < 10; i++) {
      comments.push({
        author: faker.random.arrayElement([creator, accused, admin]),
        text: faker.lorem.sentences(),
        time: faker.date.past()
      });
    }
    this.setState({ creator, accused, admin, comments });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box my={6}>
        <Box className={this.props.classes.innerPadding}>
          <Grid container>
            <Grid item lg={2} />
            <Grid item lg={8} xs={12}>
              <Box mb={2}>
                <Typography variant="h5">Dispute</Typography>
              </Box>
              <Box className={this.props.classes.outerMargin}>
                <Grid container>
                  <Grid item md={8} xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      <Tabs
                        value={this.state.activeTab}
                        onChange={this.handleTabChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                      >
                        {this.renderTab(0, 'Create')}
                        {this.renderTab(1, 'Discussion')}
                        {this.renderTab(2, 'Admin Decision')}
                        {this.renderTab(3, 'Resolved')}
                      </Tabs>
                      <div role="tabpanel" hidden={this.state.activeTab !== 0}>
                        <Create />
                      </div>
                      <div role="tabpanel" hidden={this.state.activeTab !== 1}>
                        <Box className={this.props.classes.innerPadding}>
                          <Box my={2}>
                            <Typography variant="subtitle2">Freelancer Response</Typography>
                          </Box>
                          <Divider />
                          <CommentRoom creator={this.state.creator} accused={this.state.accused} admin={this.state.admin} records={this.state.comments} />
                        </Box>
                      </div>
                      <div role="tabpanel" hidden={this.state.activeTab !== 2}>
                        <Box className={this.props.classes.innerPadding}>
                          <Box my={2}>
                            <Typography variant="subtitle2">Freelancer Response</Typography>
                          </Box>
                          <Divider />
                          <CommentRoom creator={this.state.creator} accused={this.state.accused} admin={this.state.admin} records={this.state.comments} />
                        </Box>
                      </div>
                      <div role="tabpanel" hidden={this.state.activeTab !== 3}>
                        <Box className={this.props.classes.innerPadding}>
                          <Box my={2}>
                            <Typography variant="subtitle2">Freelancer Response</Typography>
                          </Box>
                          <Divider />
                          <CommentRoom creator={this.state.creator} accused={this.state.accused} admin={this.state.admin} records={this.state.comments} />
                        </Box>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <SideBar activeTab={this.state.activeTab} creator={this.state.creator} accused={this.state.accused} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={2} />
          </Grid>
        </Box>
      </Box>
    </div>
  )

  renderTab = (index, name) => (
    <Tab label={(
      <Box display="flex" alignItems="center">
        {index < this.state.activeTab && (
          <CheckCircle color="primary" />
        )}
        {index > this.state.activeTab && (
          <Lock />
        )}
        <Box ml={1}>
          <Typography variant="body2">{name}</Typography>
        </Box>
      </Box>
    )} />
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Dispute);