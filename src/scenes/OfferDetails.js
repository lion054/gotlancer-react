import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  OutlinedInput,
  Paper,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiFillCheckCircle, AiOutlineClockCircle, AiOutlineEnvironment } from 'react-icons/ai';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import moment from 'moment';
import pluralize from 'pluralize';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ScoreReview from '../components/ScoreReview';
import CompactPagination from '../components/CompactPagination';
import { CompactCard, formatCurrency } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  outerMargin: {
    margin: theme.spacing(-2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(-1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  paper: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1)
    },
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: 'unset'
  },
  authorAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48
  },
  stamp: {
    width: 112,
    height: 112,
    borderRadius: 56
  },
  relatedAvatar: {
    width: 100,
    height: 80,
    borderRadius: 4,
    marginRight: 8
  },
  relatedBody: {
    width: 'calc(100% - 100px - 8px)'
  },
  noWrap: {
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  buyerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: theme.spacing(2)
  },
  reviewIcon: {}
});

class OfferDetails extends PureComponent {
  state = {
    pictures: [],
    addons: [{
      title: 'I can design your A4 letterhead',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your business cards & compliment slips',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your second logo',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your business card',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    },{
      title: 'I can design your A4 letterhead & business cards',
      subtitle: 'Additional 1 working day',
      price: faker.random.number({ min: 0, max: 100 })
    }],
    reviews: [],
    authorName: faker.name.findName(),
    relatedOffers: []
  }

  componentDidMount() {
    const reviews = [];
    for (let i = 0; i < 4; i++) {
      reviews.push({
        avatar: faker.image.image(),
        name: faker.name.findName(),
        country: faker.address.country(),
        createdAt: faker.date.past(),
        comment: faker.lorem.sentence(),
        score: faker.random.float({ min: 0, max: 5, precision: 0.1 })
      });
    }
    const pictures = [];
    for (let i = 0; i < 4; i++) {
      pictures.push(faker.image.image());
    }
    const relatedOffers = [];
    for (let i = 0; i < 4; i++) {
      relatedOffers.push({
        avatar: faker.image.image(),
        title: faker.lorem.sentence(),
        price: faker.random.number({ min: 0, max: 100 }),
        deadline: faker.random.number({ min: 1, max: 7 }),
        score: faker.random.float({ min: 0, max: 5, precision: 0.1 })
      });
    }
    this.setState({ reviews, pictures, relatedOffers });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} xs={12}>
          <Grid container>
            <Grid item md={9} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Paper className={this.props.classes.paper}>
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="subtitle1">Adaptive Logo Design</Typography>
                    <Chip label="FEATURED" style={{
                      backgroundColor: this.props.theme.palette.warning.main,
                      color: this.props.theme.palette.common.white
                    }} />
                    <Box my={2}>
                      <Carousel>
                        {this.state.pictures.map((picture, index) => (
                          <div key={index}>
                            <img alt="" src={picture} style={{ width: '100%' }} />
                          </div>
                        ))}
                      </Carousel>
                    </Box>
                    <Typography variant="subtitle1">What you get with this offer</Typography>
                    <Box my={2}>
                      <Typography variant="body2">{faker.lorem.paragraphs()}</Typography>
                    </Box>
                    <Typography variant="subtitle1">Get more with Offer Add-ons</Typography>
                    <Box my={2}>
                      <List disablePadding>
                        {this.state.addons.map((addon, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemIcon>
                              <Checkbox />
                            </ListItemIcon>
                            <Box flex={1}>
                              <Typography variant="body1">{addon.title}</Typography>
                              <Typography variant="body2">{addon.subtitle}</Typography>
                            </Box>
                            <Typography variant="body1" style={{ color: this.props.theme.palette.success.main }}>+${addon.price}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Typography variant="subtitle1">What the Freelancer needs to start the work</Typography>
                    <Box my={2}>
                      <Typography variant="body2">1. Company Name</Typography>
                      <Typography variant="body2">2. Company Slogan (if there is)</Typography>
                      <Typography variant="body2">3. Description about your business</Typography>
                      <Typography variant="body2">4. Preferred colors</Typography>
                      <Typography variant="body2">5. Target Market (audience)</Typography>
                      <Typography variant="body2">6. Type of Logo (symbol or wordmark or combination)</Typography>
                      <Typography variant="body2">7. Any Logo samples that you like</Typography>
                      <Typography variant="body2">8. Any other description or ideas that is important</Typography>
                    </Box>
                  </Box>
                </Paper>
                <Box mt={2}>
                  <CompactCard>
                    <CardHeader
                      title="Buyer Reviews"
                      titleTypographyProps={{
                        variant: 'subtitle1'
                      }}
                    />
                    <Divider />
                    <CardContent>
                      <List disablePadding>
                        {this.state.reviews.map((review, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemIcon>
                              <img alt="" src={review.avatar} className={this.props.classes.buyerAvatar} />
                            </ListItemIcon>
                            <Box flex={1}>
                              <Box display="flex" flexWrap="wrap">
                                <Box display="flex" alignItems="center" mr={2}>
                                  <Typography variant="subtitle2">{review.name}</Typography>
                                  <Box ml={1}>
                                    <AiFillCheckCircle color={this.props.theme.palette.success.main} size={24} />
                                  </Box>
                                </Box>
                                <Box display="flex" alignItems="center" mr={2}>
                                  <Box mr={1}>
                                    <AiOutlineEnvironment size={24} />
                                  </Box>
                                  <Typography variant="body2">{review.country}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                  <Box mr={1}>
                                    <AiOutlineClockCircle size={24} />
                                  </Box>
                                  <Typography variant="body2">{moment(review.createdAt).format('LL')}</Typography>
                                </Box>
                              </Box>
                              <Box mt={1} p={1} borderRadius={4} bgcolor={this.props.theme.palette.action.disabledBackground}>
                                <Typography variant="body2">
                                  <FaQuoteLeft style={{ marginRight: 4 }} />
                                  <Box fontStyle="italic" component="span">{review.comment}</Box>
                                  <FaQuoteRight style={{ marginLeft: 4 }} />
                                </Typography>
                                <Box mt={1}>
                                  <ScoreReview value={review.score} />
                                </Box>
                              </Box>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                      <CompactPagination />
                    </CardContent>
                  </CompactCard>
                </Box>
              </Box>
            </Grid>
            <Grid item md={3} xs={12}>
              {this.renderSideBar()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={2} />
      </Grid>
      <Footer />
    </div>
  )

  renderSideBar = () => (
    <Box className={this.props.classes.innerPadding}>
      <CompactCard>
        <CardContent>
          <Typography variant="h6" align="center" style={{ color: this.props.theme.palette.success.main }}>$70</Typography>
          <Box my={2}>
            <Button variant="contained" fullWidth>Buy Now</Button>
          </Box>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box>
              <Typography variant="body2">Sales</Typography>
              <Typography variant="subtitle2">56</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Delivered in</Typography>
              <Typography variant="subtitle2">1 day</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Response in</Typography>
              <Typography variant="subtitle2">1 day</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
            <ScoreReview value={4.9} />
            <Typography variant="body2">({pluralize('review', 10, true)})</Typography>
          </Box>
        </CardContent>
      </CompactCard>
      <Box mt={2}>
        <CompactCard>
          <CardContent>
            <Typography variant="subtitle1" align="center">About Seller</Typography>
            <Box textAlign="center" my={1}>
              <img alt="" src={require('../assets/images/user.png')} className={this.props.classes.authorAvatar} />
            </Box>
            <Box>
              <Typography variant="h6" component="span">{this.state.authorName}</Typography>
              <AiFillCheckCircle color={this.props.theme.palette.success.main} size={24} style={{ position: 'relative', top: 6 }} />
            </Box>
            <Box mb={2}>
              <AiOutlineEnvironment color={this.props.theme.palette.action.active} size={24} style={{ position: 'relative', top: 6 }} />
              <Typography variant="body2" component="span">India, Itd Mon 4:00 pm IST</Typography>
            </Box>
            <Button variant="outlined" fullWidth>View Profile</Button>
          </CardContent>
        </CompactCard>
      </Box>
      <Box mt={2}>
        <CompactCard>
          <CardContent>
            <Box textAlign="center" mb={1}>
              <img alt="" src={require('../assets/images/guarantee.svg')} className={this.props.classes.stamp} />
            </Box>
            <Typography variant="body2" align="center">Money Protection Guarantee Project done or your money back</Typography>
            <Box display="flex" mt={4}>
              <Box flex={1}>
                <Button variant="contained" fullWidth>Buyer tips</Button>
              </Box>
              <Box flex={1}>
                <Button variant="outlined" fullWidth>How its work</Button>
              </Box>
            </Box>
          </CardContent>
        </CompactCard>
      </Box>
      <Box mt={2}>
        <CompactCard>
          <CardHeader
            title="Related Offers"
            titleTypographyProps={{
              variant: 'subtitle1'
            }}
          />
          <Divider />
          <CardContent>
            <List disablePadding>
              {this.state.relatedOffers.map(({ avatar, title, price, deadline, score }, index) => (
                <ListItem key={index} disableGutters style={{ overflow: 'hidden' }}>
                  <img alt="" src={avatar} className={this.props.classes.relatedAvatar} />
                  <Box className={this.props.classes.relatedBody}>
                    <Typography variant="body2" className={this.props.classes.noWrap}>{title}</Typography>
                    <Typography variant="body2" style={{ color: this.props.theme.palette.success.main }}>{formatCurrency(price)}</Typography>
                    <Typography variant="body2" className={this.props.classes.noWrap}>Complete in {pluralize('day', deadline, true)}</Typography>
                    <ScoreReview value={score} />
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
          <Divider />
          <CardActions>
            <Button variant="outlined" fullWidth>Browse Offers</Button>
          </CardActions>
        </CompactCard>
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(OfferDetails);