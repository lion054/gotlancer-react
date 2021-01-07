import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  CardHeader,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Tabs,
  Typography,
  withStyles,
  withTheme,
  Button
} from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import PlaceholderSelect from '../components/PlaceholderSelect';
import { CompactCard, CompactTab, formatCurrency } from '../global';

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

class PostProject extends PureComponent {
  state = {
    activeTab: 0,
    faqList: [],
    categories: [],
    badges: []
  }

  componentDidMount() {
    const faqList = [];
    for (let i = 0; i < 5; i++) {
      faqList.push({
        question: 'How long take my first withdrawal?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi '
      });
    }
    const categories = [];
    for (let i = 0; i < 5; i++) {
      categories.push(faker.lorem.words(2));
    }
    const badges = [{
      color: this.props.theme.palette.success.main,
      title: 'Standard',
      description: 'Free to post, your project will go live instantly and start receiving bids within seconds.',
      price: 0
    },{
      color: this.props.theme.palette.action.disabled,
      title: 'NDA',
      description: 'Freelancers must sign a Non- disclosure Agreement to Apply on your project. Freelancers agree to keep details discussed through private messages and files confidential.',
      price: 5
    },{
      color: this.props.theme.palette.info.main,
      title: 'Featured',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    },{
      color: this.props.theme.palette.error.main,
      title: 'Urgent',
      description: 'Make your project stand out and let freelancers know that your job is time sensitive.',
      price: 5
    },{
      color: this.props.theme.palette.primary.main,
      title: 'Private',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    },{
      color: this.props.theme.palette.warning.main,
      title: 'Premium',
      description: 'Make your project stand out and let freelancers know that your job is time sensitive.',
      price: 5
    }];
    this.setState({ faqList, categories, badges });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  handleBadge = (index) => (e) => {
    const badges = cloneDeep(this.state.badges);
    badges[index].checked = !badges[index].checked;
    this.setState({ badges });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
                <Grid item md={8} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Tabs
                          value={this.state.activeTab}
                          onChange={this.handleTabChange}
                          indicatorColor="primary"
                          textColor="primary"
                        >
                          <CompactTab label="Fixed Price Project" />
                          <CompactTab label="Uourly Project" />
                        </Tabs>
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">Provide a name for your project</Typography>
                        </Box>
                        <OutlinedInput
                          fullWidth
                          margin="dense"
                        />
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">Tell us more about your project</Typography>
                        </Box>
                        <Box mb={1}>
                          <Typography variant="body2">Start with a bit about yourself or your business, and include an overview of what you need one.</Typography>
                        </Box>
                        <OutlinedInput
                          fullWidth
                          margin="dense"
                          multiline
                          rows={5}
                        />
                        <Box mt={1} mb={1}>
                          <Typography variant="body2" align="right">0/5000</Typography>
                        </Box>
                        <Box mt={3} mb={1}>
                          <Typography variant="subtitle2">Suggested files or attachment (optional)</Typography>
                        </Box>
                        <FileUpload />
                        <Box mt={2} mb={2}>
                          <Divider />
                        </Box>
                        <Box className={this.props.classes.outerMargin}>
                          <Grid container>
                            <Grid item sm={6} xs={12}>
                              <Box className={this.props.classes.innerPadding}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">Select project categories</Typography>
                                </Box>
                                <PlaceholderSelect
                                  fullWidth
                                  margin="dense"
                                  variant="outlined"
                                  placeholder="Select one"
                                >
                                  {this.state.categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>{category}</MenuItem>
                                  ))}
                                </PlaceholderSelect>
                              </Box>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <Box className={this.props.classes.innerPadding}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">Select sub-categories</Typography>
                                </Box>
                                <PlaceholderSelect
                                  fullWidth
                                  margin="dense"
                                  variant="outlined"
                                  placeholder="Select one"
                                >
                                  {this.state.categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>{category}</MenuItem>
                                  ))}
                                </PlaceholderSelect>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mt={3}>
                          <Typography variant="subtitle2">What skills are required?</Typography>
                        </Box>
                        <Box mt={1} mb={1}>
                          <Typography variant="body2">We have detected the following skills to suit your project. Feel free to modify these choices to best suit your needs.</Typography>
                        </Box>
                        <Box mb={2}>
                          <OutlinedInput
                            fullWidth
                            margin="dense"
                            placeholder="Type your required skills"
                          />
                        </Box>
                        <Box className={this.props.classes.outerMargin}>
                          <Grid container>
                            <Grid item sm={6} xs={12}>
                              <Box className={this.props.classes.innerPadding}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">I need to complete in</Typography>
                                  <Typography variant="body2">Set a amazing budget for your project.</Typography>
                                </Box>
                                <PlaceholderSelect
                                  fullWidth
                                  margin="dense"
                                  variant="outlined"
                                  placeholder="Select one"
                                >
                                  <MenuItem value="7d">7 days or less</MenuItem>
                                  <MenuItem value="14d">14 days or less</MenuItem>
                                  <MenuItem value="1m">1 month or less</MenuItem>
                                </PlaceholderSelect>
                              </Box>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <Box className={this.props.classes.innerPadding}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">Project Budget</Typography>
                                  <Typography variant="body2">Set a amazing budget for your project.</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                  <OutlinedInput
                                    fullWidth
                                    margin="dense"
                                    startAdornment={(
                                      <InputAdornment position="start">
                                        <AttachMoney />
                                      </InputAdornment>
                                    )}
                                  />
                                  {this.state.activeTab === 1 && (
                                    <Fragment>
                                      <Typography variant="body2" noWrap style={{ minWidth: 44 }}>/hr To </Typography>
                                      <OutlinedInput
                                        fullWidth
                                        margin="dense"
                                        startAdornment={(
                                          <InputAdornment position="start">
                                            <AttachMoney />
                                          </InputAdornment>
                                        )}
                                      />
                                      <Typography variant="body2">/hr</Typography>
                                    </Fragment>
                                  )}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mt={3}>
                          <Typography variant="subtitle2">Select your listing</Typography>
                        </Box>
                        <Box mt={1} mb={1}>
                          <Typography variant="body2">Upgrade your listing from below and get dozens of skilled freelancers for your project instantly.</Typography>
                        </Box>
                        {this.renderBadgeList()}
                        <Box mt={1} mb={3}>
                          <Divider />
                        </Box>
                        <Typography variant="body1" align="right">Total: {formatCurrency(0)}</Typography>
                        <Box mt={3} mb={3}>
                          <Divider />
                        </Box>
                        <FormControlLabel
                          control={(
                            <Checkbox onClick={(e) => e.stopPropagation()} />
                          )}
                          label={<Typography variant="body2">I acknowledge that the Gotlancer screening process is confidential and that I will not publicly disclose details about this process. By submitting you acknowledge that you have read and agree to our Terms and Conditions, Privacy Policy and Cookie Policy.</Typography>}
                          onClick={() => {}}
                        />
                        <Box mt={4} width="100%" textAlign="center">
                          <Box display="inline-block">
                            <Button variant="outlined" size="large" style={{ marginRight: this.props.theme.spacing(2) }}>Save as draft</Button>
                            <Button variant="contained" size="large">Post my project</Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    {this.renderFaqCard()}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  renderBadgeList = () => (
    <List disablePadding>
      {this.state.badges.map((badge, index) => (
        <ListItem key={index} disableGutters button onClick={this.handleBadge(index)}>
          <Box width="100%" display="flex" alignItems="center">
            <Checkbox checked={!!badge.checked} onClick={this.handleBadge(index)} />
            <Box
              flex={1}
              className={this.props.classes.innerPadding}
              borderRadius={4}
              border={`solid 1px ${badge.checked ? this.props.theme.palette.secondary.main : this.props.theme.palette.divider}`}
              bgcolor={this.props.theme.palette.background.paper}
            >
              <Grid container alignItems="center">
                <Grid item sm={2} xs={3}>
                  <Chip label={badge.title} style={{
                    backgroundColor: badge.color,
                    color: this.props.theme.palette.common.white
                  }} />
                </Grid>
                <Grid item sm={8} xs={7}>
                  <Typography variant="body2">{badge.description}</Typography>
                </Grid>
                <Grid item sm={2} xs={2}>
                  <Typography variant="body2" align="right">{formatCurrency(badge.price)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  )

  renderFaqCard = () => (
    <CompactCard>
      <CardHeader
        title="Recomanded articles"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
      />
      <Divider />
      <CardContent className="noVertPadding">
        <List disablePadding className="noLastDivider">
          {this.state.faqList.map((faq, index) => (
            <ListItem key={index} disableGutters divider>
              <ListItemText
                primary={faq.question}
                secondary={faq.answer}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </CompactCard>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(PostProject);