import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { CheckCircle, CloudUpload, Lock } from '@material-ui/icons';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

import Header from '../../components/Header';
import CommentRoom from '../../components/CommentRoom';
import { CompactCard, formatCurrency } from '../../global';

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
  },
  creditRow: {
    display: 'flex',
    margin: theme.spacing(-1, -2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(-0.5, -1)
    }
  },
  creditField: {
    flex: 1,
    margin: theme.spacing(1, 2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(0.5, 1)
    }
  },
  creditAvatar: {
    width: '100%',
    borderRadius: 8
  }
})

class Disputation extends PureComponent {
  state = {
    activeTab: 0,
    projects: [],
    creator: {},
    accused: {},
    admin: {},
    comments: []
  }

  componentDidMount() {
    const projects = [];
    for (let i = 0; i < 5; i++) {
      projects.push({
        id: faker.random.number({ min: 1000000, max: 10000000 }),
        title: faker.lorem.sentence(5)
      });
    }
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
    this.setState({ projects, creator, accused, admin, comments });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={6} mb={6}>
        <Box className={this.props.classes.innerPadding}>
          <Grid container>
            <Grid item lg={2} />
            <Grid item lg={8} xs={12}>
              <Box mb={2}>
                <Typography variant="h5">Disputation</Typography>
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
                        {this.renderCreationPanel()}
                      </div>
                      <div role="tabpanel" hidden={this.state.activeTab !== 1}>
                        <Box className={this.props.classes.innerPadding}>
                          <Box mt={2} mb={2}>
                            <Typography variant="subtitle2">Freelancer Response</Typography>
                          </Box>
                          <Divider />
                          <CommentRoom creator={this.state.creator} accused={this.state.accused} admin={this.state.admin} records={this.state.comments} />
                        </Box>
                      </div>
                      <div role="tabpanel" hidden={this.state.activeTab !== 2}>
                        <Box className={this.props.classes.innerPadding}>
                          <Box mt={2} mb={2}>
                            <Typography variant="subtitle2">Freelancer Response</Typography>
                          </Box>
                          <Divider />
                          <CommentRoom creator={this.state.creator} accused={this.state.accused} admin={this.state.admin} records={this.state.comments} />
                        </Box>
                      </div>
                      <div role="tabpanel" hidden={this.state.activeTab !== 3}>
                        <Box className={this.props.classes.innerPadding}>
                          <Box mt={2} mb={2}>
                            <Typography variant="subtitle2">Freelancer Response</Typography>
                          </Box>
                          <Divider />
                          <CommentRoom creator={this.state.creator} accused={this.state.accused} admin={this.state.admin} records={this.state.comments} />
                        </Box>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      {this.state.activeTab === 0 ? this.renderNoteCard() : (
                        <Fragment>
                          {this.renderDetailsCard()}
                          <Box mt={2}>
                            {this.renderCreditsCard()}
                          </Box>
                        </Fragment>
                      )}
                    </Box>
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

  renderNoteCard = () => (
    <CompactCard>
      <CardHeader
        title="Dispute Note"
        titleTypographyProps={{
          variant: 'h6'
        }}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</Typography>
      </CardContent>
    </CompactCard>
  )

  renderDetailsCard = () => (
    <CompactCard>
      <CardHeader
        title="Dispute Details"
        titleTypographyProps={{
          variant: 'h6'
        }}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2">Project ID: 32546545</Typography>
        <Typography variant="body2">Dispute amount: $300.00 USD</Typography>
        <Typography variant="body2">Created at: 26 May 2020, 02:45 AM</Typography>
        {this.state.activeTab === 3 ? (
          <Typography variant="body2">Status: <span style={{ color: this.props.theme.palette.error.main }}>Closed</span></Typography>
        ) : (
          <Typography variant="body2">Status: <span style={{ color: this.props.theme.palette.success.main }}>Active</span></Typography>
        )}
        {this.state.activeTab === 3 ? (
          <Typography variant="body2">Closed at: 26 May 2020, 02:45 AM</Typography>
        ) : (
          <Typography variant="body2">Reply before: <span style={{ color: this.props.theme.palette.success.main }}>21 hours 26min  33 sec</span></Typography>
        )}
      </CardContent>
    </CompactCard>
  )

  renderCreditsCard = () => (
    <CompactCard>
      <CardHeader
        title="Dispute Credits"
        titleTypographyProps={{
          variant: 'h6'
        }}
      />
      <Divider />
      <CardContent>
        <Box mb={1}>
          <Typography variant="body2" align="center">VS</Typography>
        </Box>
        <Box className={this.props.classes.creditRow}>
          <Box
            className={this.props.classes.creditField}
            bgcolor={this.props.theme.palette.primary.main}
            color={this.props.theme.palette.common.white}
            borderRadius={26}
          >
            <Typography variant="body2" align="center">Dispute creator</Typography>
          </Box>
          <Box className={this.props.classes.creditField}></Box>
        </Box>
        <Box className={this.props.classes.creditRow}>
          <Box className={this.props.classes.creditField}>
            <img alt="" src={this.state.creator.avatar} className={this.props.classes.creditAvatar} />
          </Box>
          <Box className={this.props.classes.creditField}>
            <img alt="" src={this.state.accused.avatar} className={this.props.classes.creditAvatar} />
          </Box>
        </Box>
        <Box className={this.props.classes.creditRow}>
          <Box className={this.props.classes.creditField}>
            <Typography variant="body2" align="center">Project owner</Typography>
          </Box>
          <Box className={this.props.classes.creditField}>
            <Typography variant="body2" align="center">Freelancer</Typography>
          </Box>
        </Box>
        <Box className={this.props.classes.creditRow}>
          <Box className={this.props.classes.creditField}>
            <Typography variant="body2">{this.state.activeTab === 3 ? 'Received' : 'Want to receive'}</Typography>
          </Box>
          <Box className={this.props.classes.creditField}>
            <Typography variant="body2">{this.state.activeTab === 3 ? 'Received' : 'Want to receive'}</Typography>
          </Box>
        </Box>
        <Box className={this.props.classes.creditRow}>
          <Box className={this.props.classes.creditField}>
            <Typography variant="body2">$300.00</Typography>
          </Box>
          <Box className={this.props.classes.creditField}>
            <Typography variant="body2">$300.00</Typography>
          </Box>
        </Box>
        {this.state.activeTab !== 3 && (
          <Box className={this.props.classes.creditRow}>
            <Box className={this.props.classes.creditField}>
              <Button fullWidth variant="contained">Cancel dispute</Button>
            </Box>
            <Box className={this.props.classes.creditField}>
              <Button fullWidth variant="outlined">New offer</Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </CompactCard>
  )

  renderCreationPanel = () => (
    <Box className={this.props.classes.innerPadding}>
      <Box mt={2} mb={2}>
        <Typography variant="subtitle2">Create Dispute</Typography>
      </Box>
      <Divider />
      <Box mt={2} mb={2}>
        <Typography variant="subtitle2">Select Project</Typography>
      </Box>
      <Select
        fullWidth
        margin="dense"
        variant="outlined"
      >
        {this.state.projects.map((project, index) => (
          <MenuItem key={index} value={project.id}>{project.title} (Project ID: {project.id})</MenuItem>
        ))}
      </Select>
      <Box mt={2} mb={2}>
        <Typography variant="subtitle2">Select Milestone(s) to Dispute</Typography>
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">All milestone(s) (Amount: {formatCurrency(45)})</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Milestone for logo (Amount: {formatCurrency(20)})</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={(
            <Checkbox onClick={(e) => e.stopPropagation()} />
          )}
          label={<Typography variant="body2">Milestone for business card (Amount: {formatCurrency(25)})</Typography>}
          onClick={() => {}}
        />
      </Box>
      <Box mt={2} mb={2}>
        <Typography variant="subtitle2">Dispute Reason</Typography>
      </Box>
      <OutlinedInput
        fullWidth
        margin="dense"
        multiline
        rows={5}
        placeholder="Tell us more about why you want dispute"
      />
      <Box mt={2} mb={2}>
        <Typography variant="subtitle2">Attach abidance (Optional)</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={2}>
          <Button variant="outlined" startIcon={<CloudUpload />}>Upload</Button>
        </Box>
        <Typography variant="body2">No file selected</Typography>
      </Box>
      <Box mt={1} mb={2}>
        <Typography variant="body2">File format: JPEG, PNG, PDF, DOCX</Typography>
      </Box>
      <Divider />
      <Box display="flex" mt={2}>
        <Button variant="contained" size="large">Create dispute now</Button>
        <Box ml={2}>
          <Button variant="outlined" size="large">No, thanks</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Disputation);