import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardHeader,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Add, AttachMoney, Close } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import PlaceholderSelect from '../components/PlaceholderSelect';
import { CompactCard, GreenButton, formatCurrency } from '../global';

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
  moneyPrefix: {
    marginLeft: theme.spacing(-0.5)
  }
})

class PostOffer extends PureComponent {
  state = {
    faqList: [],
    categories: [],
    badges: [],
    optionalServices: []
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
      color: this.props.theme.palette.info.main,
      title: 'Featured',
      description: 'Featured projects attract higher-quality bids and are displayed prominently in the `Featured Jobs and Contests` page.',
      price: 5
    }];
    const optionalServices = [];
    for (let i = 0; i < 2; i++) {
      optionalServices.push({
        title: faker.lorem.sentence(),
        budget: faker.random.number({ min: 1, max: 100 }),
        deadline: faker.random.number({ min: 1, max: 14 })
      });
    }
    this.setState({ faqList, categories, badges, optionalServices });
  }

  handleBadge = (index) => (e) => {
    const badges = cloneDeep(this.state.badges);
    badges[index].checked = !badges[index].checked;
    this.setState({ badges });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
                <Grid item md={8} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardHeader
                        title="Post an offer in second"
                        subheader="Offer: a packed service you can deliver for a fixed price in a set timeframe."
                      />
                      <Divider />
                      <CardContent>
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">Offer Title</Typography>
                        </Box>
                        <Grid container>
                          <Grid item md={9} xs={12}>
                            <OutlinedInput
                              fullWidth
                              margin="dense"
                              startAdornment={(
                                <InputAdornment position="start">
                                  <Typography variant="body2">I can</Typography>
                                </InputAdornment>
                              )}
                            />
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <Box display="flex" alignItems="center">
                              <Typography>&nbsp;for&nbsp;</Typography>
                              <OutlinedInput
                                fullWidth
                                margin="dense"
                                startAdornment={(
                                  <InputAdornment position="start" className={this.props.classes.moneyPrefix}>
                                    <AttachMoney />
                                  </InputAdornment>
                                )}
                              />
                            </Box>
                          </Grid>
                        </Grid>
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
                        <Box my={1}>
                          <Typography variant="body2" align="right">0/5000</Typography>
                        </Box>
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">When will you deliver the offer?</Typography>
                        </Box>
                        <Box my={1}>
                          <PlaceholderSelect
                            margin="dense"
                            variant="outlined"
                            placeholder="Select one"
                            style={{ width: 300 }}
                          >
                            <MenuItem value="0">Within 7 days</MenuItem>
                            <MenuItem value="1">Within a month</MenuItem>
                          </PlaceholderSelect>
                        </Box>
                        <Box my={2}>
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
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">Add some relavent tags</Typography>
                          <Typography variant="body2">We have detected the following skills to suit your project. Feel free to modify these choices to best suit your needs.</Typography>
                        </Box>
                        <OutlinedInput
                          fullWidth
                          margin="dense"
                          placeholder="Type your required skills"
                        />
                        <Box mt={3} mb={1}>
                          <Typography variant="subtitle2">Make it fun: upload photos, videos!</Typography>
                        </Box>
                        <FileUpload />
                        <Box my={2}>
                          <Divider />
                        </Box>
                        <Box mt={3}>
                          <Typography variant="subtitle2">Earn Extra money - offer optional add-on services to the Buyer</Typography>
                        </Box>
                        {this.state.optionalServices.map(({ title, budget, deadline }, index) => (
                          <Box key={index} my={1}>
                            <Grid container alignItems="center">
                              <Grid item md={6} xs={12}>
                                <OutlinedInput
                                  fullWidth
                                  margin="dense"
                                  value={title}
                                  startAdornment={(
                                    <InputAdornment position="start">
                                      <Typography variant="body2">I can</Typography>
                                    </InputAdornment>
                                  )}
                                />
                              </Grid>
                              <Grid item md={3} xs={6}>
                                <Box display="flex" alignItems="center">
                                  <Typography variant="body2">&nbsp;for&nbsp;</Typography>
                                  <OutlinedInput
                                    fullWidth
                                    margin="dense"
                                    value={budget.toString()}
                                    startAdornment={(
                                      <InputAdornment position="start" className={this.props.classes.moneyPrefix}>
                                        <AttachMoney />
                                      </InputAdornment>
                                    )}
                                  />
                                  <Typography variant="body2">&nbsp;in&nbsp;</Typography>
                                </Box>
                              </Grid>
                              <Grid item md={3} xs={6}>
                                <Box display="flex" alignItems="center">
                                  <PlaceholderSelect
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    placeholder="Select one"
                                  >
                                    <MenuItem value="0">1 day</MenuItem>
                                    <MenuItem value="1">1 week</MenuItem>
                                  </PlaceholderSelect>
                                  <IconButton>
                                    <Close />
                                  </IconButton>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                        <GreenButton variant="text" startIcon={<Add />}>Add more items</GreenButton>
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">What do you need from the Buyer to get started?</Typography>
                        </Box>
                        <OutlinedInput
                          fullWidth
                          margin="dense"
                          placeholder="Explain what you will need from Bu to deliver the work.."
                          multiline
                          rows={5}
                        />
                        <Box mt={2} mb={1}>
                          <Typography variant="subtitle2">How are you planning to work with the Buyer?</Typography>
                        </Box>
                        <Box>
                          <FormControlLabel
                            control={(
                              <Checkbox onClick={(e) => e.stopPropagation()} />
                            )}
                            label={<Typography variant="body2">Remotely</Typography>}
                            onClick={() => {}}
                          />
                        </Box>
                        <Box>
                          <FormControlLabel
                            control={(
                              <Checkbox onClick={(e) => e.stopPropagation()} />
                            )}
                            label={<Typography variant="body2">On-site</Typography>}
                            onClick={() => {}}
                          />
                        </Box>
                        <Box>
                          <FormControlLabel
                            control={(
                              <Checkbox onClick={(e) => e.stopPropagation()} />
                            )}
                            label={<Typography variant="body2">I confirm that I am able to iver this service to Buyers within the delivery time specified. I will update or pause my offer if I can no lnger meet this delivery time. I understand that late delivery will adversely affect my ranking on Gotlancer and will entitle the Buyer to a refund. See <Link href="#">T&amp;Cs</Link>.</Typography>}
                            onClick={() => {}}
                          />
                        </Box>
                        <Box mt={3}>
                          <Typography variant="subtitle2">Select your listing</Typography>
                        </Box>
                        <Box my={1}>
                          <Typography variant="body2">Upgrade your listing from below and get dozens of skilled freelancers for your project instantly.</Typography>
                        </Box>
                        {this.renderBadgeList()}
                        <Box mt={1} mb={3}>
                          <Divider />
                        </Box>
                        <Typography variant="body1" align="right">Total: {formatCurrency(0)}</Typography>
                        <Box my={3}>
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
          <Box display="flex" alignItems="center" flex={1}>
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
        title="Recommended articles"
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
)(PostOffer);