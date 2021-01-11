import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Drawer,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Slider,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { AiFillHeart, AiOutlineHeart, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import pluralize from 'pluralize';
import clsx from 'clsx';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import UserAvatar from '../components/UserAvatar';
import CompactPagination from '../components/CompactPagination';
import SelectCountry from '../components/SelectCountry';
import { CompactCard } from '../global';

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
  rightSideBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  search: {
    padding: theme.spacing(2, 0, 2, 2),
    fontSize: theme.spacing(1.5)
  },
  productAvatar: {
    height: 240,
    [theme.breakpoints.down('sm')]: {
      height: 160
    }
  },
  saveIcon: {
    border: `solid 1px ${theme.palette.divider}`
  }
})

class BrowseOffer extends PureComponent {
  state = {
    budgetRange: [20, 27],
    records: [],
    drawerOpened: false
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 9; i++) {
      records.push({
        productAvatar: faker.image.image(),
        productTitle: faker.lorem.words(3),
        authorAvatar: faker.image.image(),
        authorName: faker.name.findName(),
        authorLevel: faker.random.number({ min: 1,  max: 10 }),
        reviewScore: faker.random.number({ min: 0,  max: 5 }),
        reviewCount: faker.random.number({ min: 0,  max: 1000 }),
        sales: faker.random.number({ min: 0,  max: 100 }),
        budget: faker.random.number({ min: 0,  max: 100 }),
        deadline: faker.random.number({ min: 1,  max: 7 }),
        saved: faker.random.boolean()
      });
    }
    this.setState({ records });
  }

  handleDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened })

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <Grid container>
              <Grid item md={9}>
                <Paper className={this.props.classes.paper}>
                  {this.renderSearchBar()}
                  <Box className={this.props.classes.innerPadding}>
                    <Typography variant="body2">150,750 offers found</Typography>
                  </Box>
                  <Grid container>
                    {this.state.records.map((record, index) => (
                      <Grid key={index} item md={4} sm={6} xs={12}>
                        <Box className={this.props.classes.innerPadding}>
                          <CompactCard>
                            <CardActionArea>
                              <CardMedia
                                className={this.props.classes.productAvatar}
                                image={record.productAvatar}
                              />
                              <CardContent>
                                <Typography variant="subtitle2">{record.productTitle}</Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                  <Box display="flex" alignItems="center">
                                    <UserAvatar
                                      url={record.authorAvatar}
                                      online
                                      size={this.props.theme.spacing(4)}
                                      sizeSM={this.props.theme.spacing(3)}
                                      marginRight={this.props.theme.spacing(2)}
                                      marginRightSM={this.props.theme.spacing(1)}
                                    />
                                    <Box>
                                      <Typography variant="body2">{record.authorName}</Typography>
                                      <Typography variant="body2" color="textSecondary">Level {record.authorLevel}</Typography>
                                    </Box>
                                  </Box>
                                  {record.saved ? (
                                    <AiFillHeart color={this.props.theme.palette.secondary.main} size={this.props.theme.spacing(3)} />
                                  ) : (
                                    <AiOutlineHeart color={this.props.theme.palette.action.active} size={this.props.theme.spacing(3)} />
                                  )}
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                  <Box>
                                    <Rating name="read-only" value={record.reviewScore} readOnly size="small" />
                                    <Typography variant="body2">({pluralize('review', record.reviewCount, true)})</Typography>
                                  </Box>
                                  <Box textAlign="center">
                                    <Typography variant="body1">{record.sales}</Typography>
                                    <Typography variant="body2">{pluralize('Sale', record.sales)}</Typography>
                                  </Box>
                                  <Box textAlign="center">
                                    <Typography variant="body1" style={{ color: this.props.theme.palette.success.main }}>${record.budget}</Typography>
                                    <Typography variant="body2">{pluralize('day', record.deadline, true)}</Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                            </CardActionArea>
                          </CompactCard>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Box mb={2}>
                    <CompactPagination />
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Box className={clsx(this.props.classes.innerPadding, this.props.classes.rightSideBar)}>
                  {this.renderFilterBar()}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={2} />
      </Grid>
      <Footer />
      <Drawer
        anchor="left"
        open={this.state.drawerOpened}
        onClose={this.handleDrawer}
      >
        <Box m={2}>
          {this.renderFilterBar()}
        </Box>
      </Drawer>
    </div>
  )

  renderSearchBar = () => (
    <Box display="flex" className={this.props.classes.innerPadding}>
      <Box className={this.props.classes.menuButton}>
        <IconButton onClick={() => this.setState({ drawerOpened: true })}>
          <AiOutlineMenu size={20} />
        </IconButton>
      </Box>
      <Box flex={1}>
        <OutlinedInput
          fullWidth
          placeholder="Search for offer"
          inputProps={{
            className: this.props.classes.search
          }}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton>
                <AiOutlineSearch size={16} />
              </IconButton>
            </InputAdornment>
          )}
          style={{
            backgroundColor: this.props.theme.palette.background.paper,
            paddingRight: this.props.theme.spacing(0.5)
          }}
        />
      </Box>
    </Box>
  )

  renderFilterBar = () => (
    <Fragment>
      <Box>
        <Typography variant="subtitle2">Select category</Typography>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">All</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Website Development</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Graphic Design</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Digital Marketing</Typography>}
            onClick={() => {}}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle2">Select sub-category</Typography>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">All</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Website Development</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Graphic Design</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Digital Marketing</Typography>}
            onClick={() => {}}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle2">Budget</Typography>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Any budget</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Custom budget</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Slider
          value={this.state.budgetRange}
          onChange={this.handleBudgetChange}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle2">Online Status</Typography>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Any</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Online seller</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Offline seller</Typography>}
            onClick={() => {}}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle2">Location</Typography>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Any</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <SelectCountry
            fullWidth
            margin="dense"
            autoHighlight
            label="Choose a country"
            onChange={(e, item) => this.setState({ country: item.iso2 })}
          />
        </Box>
      </Box>
    </Fragment>
  )

  handleBudgetChange = (event, newValue) => {
    this.setState({ budgetRange: newValue });
  }
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(BrowseOffer);