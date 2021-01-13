import React, { Fragment, PureComponent } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  OutlinedInput,
  Paper,
  Slider,
  Typography,
  withStyles,
  withTheme,
  withWidth,
  Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import {
  AiFillHeart,
  AiFillClockCircle,
  AiFillDollarCircle,
  AiFillEnvironment,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch
} from 'react-icons/ai';
import pluralize from 'pluralize';
import moment from 'moment';
import clsx from 'clsx';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ChipContainer from '../components/ChipContainer';
import CompactPagination from '../components/CompactPagination';
import { formatCurrency } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
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
  newRecords: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(0, 1),
    color: theme.palette.common.white,
    textTransform: 'uppercase'
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
  thumbnail: {
    width: 160,
    height: 140,
    borderRadius: 4,
    marginRight: 16
  },
  description: {
    height: theme.spacing(5), // 2 lines
    overflow: 'hidden'
  },
  actionIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.divider,
    color: theme.palette.action.active
  },
  saveIcon: {
    padding: theme.spacing(0.5),
    border: `solid 1px ${theme.palette.divider}`
  }
})

class FindContest extends PureComponent {
  state = {
    newRecords: 32,
    records: [],
    drawerOpened: false,
    budgetRange: [20, 27]
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 5; i++) {
      const skills = [];
      for (let j = 0; j < 3; j++) {
        skills.push({
          title: faker.lorem.words(2),
          backgroundColor: this.props.theme.palette.action.disabledBackground,
          color: this.props.theme.palette.text.secondary
        });
      }
      records.push({
        thumbnail: faker.image.image(),
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentences(10),
        type: 'PRIZE',
        budget: faker.random.number({ min: 30, max: 40 }),
        badges: faker.random.arrayElements([{
          title: 'TOP PROJECT',
          backgroundColor: this.props.theme.palette.primary.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'NDA',
          backgroundColor: this.props.theme.palette.secondary.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'URGENT',
          backgroundColor: this.props.theme.palette.error.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'FEATURED',
          backgroundColor: this.props.theme.palette.warning.main,
          color: this.props.theme.palette.common.white
        },{
          title: 'LONG TERM',
          backgroundColor: this.props.theme.palette.success.main,
          color: this.props.theme.palette.common.white
        }]),
        postedAt: faker.date.past(),
        closedAt: faker.date.future(),
        skills,
        entries: faker.random.number({ min: 0, max: 100 }),
        reviewCount: faker.random.number({ min: 0, max: 10 }),
        reviewAverage: faker.random.number({ min: 0, max: 5 }),
        status: 'Active',
        saved: faker.random.boolean()
      });
    }
    this.setState({ records });
  }

  handleDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened })

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box className={this.props.classes.innerPadding}>
        <Box height={this.props.theme.spacing(6)} display="flex" justifyContent="center" alignItems="center">
          {!!this.state.newRecords && (
            <Button
              size="small"
              className={this.props.classes.newRecords}
              onClick={() => this.setState({ newRecords: 0 })}
            >View {pluralize('new contest', this.state.newRecords, true)}</Button>
          )}
        </Box>
      </Box>
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} xs={12}>
          <Grid container>
            <Grid item md={9}>
              {this.renderList()}
            </Grid>
            <Grid item md={3}>
              <Box className={clsx(this.props.classes.innerPadding, this.props.classes.rightSideBar)}>
                {this.renderFilterBar()}
              </Box>
            </Grid>
          </Grid>
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

  renderList = () => (
    <Box className={this.props.classes.innerPadding}>
      <Box display="flex">
        <Box className={this.props.classes.menuButton}>
          <IconButton onClick={() => this.setState({ drawerOpened: true })}>
            <AiOutlineMenu />
          </IconButton>
        </Box>
        <Box flex={1}>
          <OutlinedInput
            fullWidth
            placeholder="Search for project"
            inputProps={{
              className: this.props.classes.search
            }}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton>
                  <AiOutlineSearch />
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
      <Box my={2}>
        <Typography variant="body2">{pluralize('job', 4500, true)} found</Typography>
      </Box>
      <List disablePadding>
        {this.state.records.map((record, index) => (
          <Paper key={index} className={this.props.classes.paper}>
            <ListItem button onClick={() => this.props.history.push('/job_details')}>
              {(this.props.width === 'xs' || this.props.width === 'sm') ? this.renderMobileCard(record, index) : this.renderDesktopCard(record, index)}
            </ListItem>
          </Paper>
        ))}
      </List>
      <Box mb={4}>
        <CompactPagination />
      </Box>
    </Box>
  )

  renderDesktopCard = (record, index) => (
    <Box flex={1}>
      <Box display="flex" alignItems="center">
        <img alt="" src={record.thumbnail} className={this.props.classes.thumbnail} />
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">{record.title}</Typography>
            <Typography variant="h6">{formatCurrency(record.budget)}</Typography>
          </Box>
          <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
            <ChipContainer chips={record.badges} readOnly />
            <Typography variant="body2" color="textSecondary">{record.type}</Typography>
          </Box>
          <Box mt={1.5}>
            <Typography variant="body2" className={this.props.classes.description}>{record.description}</Typography>
          </Box>
          <Box mt={1} mb={1.5} display="flex" justifyContent="space-between">
            <ChipContainer chips={record.skills} readOnly />
            <Typography variant="body2" color="textSecondary">Posted {moment(record.postedAt).fromNow()}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box mt={1.5} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        {this.renderDeadline(record.closedAt)}
        {this.renderEntryCount(record.entries)}
        {this.renderReview(record.reviewCount, record.reviewAverage)}
        {this.renderStatus(record.status)}
        <Box display="inline-block">
          <Box display="flex" alignItems="center">
            <IconButton
              className={this.props.classes.saveIcon}
              onClick={(e) => {
                const records = cloneDeep(this.state.records);
                records[index].saved = !records[index].saved;
                this.setState({ records });
                e.stopPropagation();
              }}
            >
              {record.saved ? (
                <AiFillHeart color={this.props.theme.palette.secondary.main} />
              ) : (
                <AiOutlineHeart />
              )}
            </IconButton>
            <Box ml={1}>
              <Typography variant="body2" align="right">Saved</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  renderMobileCard = (record, index) => (
    <Box flex={1}>
      <Typography variant="subtitle1">{record.title}</Typography>
      <Box mt={1}>
        <ChipContainer chips={record.badges} readOnly />
      </Box>
      <Box mt={1.5}>
        <Typography variant="body2" className={this.props.classes.description}>{record.description}</Typography>
      </Box>
      <Box mt={1.5} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{formatCurrency(record.budget)}</Typography>
        <Typography variant="body2" color="textSecondary">Posted {moment(record.postedAt).fromNow()}</Typography>
      </Box>
      <Box mt={1.5}>
        <Typography variant="body2" color="textSecondary">{record.type}</Typography>
      </Box>
      <Box mt={1} mb={1.5}>
        <ChipContainer chips={record.skills} readOnly />
      </Box>
      <Divider />
      <Box mt={1.5} display="flex" flexWrap="wrap">
        {this.renderDeadline(record.closedAt)}
        {this.renderEntryCount(record.entries)}
        {this.renderReview(record.reviewCount, record.reviewAverage)}
        {this.renderStatus(record.status)}
        <Box display="inline-block">
          <Box display="flex" alignItems="center">
            <IconButton
              className={this.props.classes.saveIcon}
              onClick={(e) => {
                const records = cloneDeep(this.state.records);
                records[index].saved = !records[index].saved;
                this.setState({ records });
                e.stopPropagation();
              }}
            >
              {record.saved ? (
                <AiFillHeart color={this.props.theme.palette.secondary.main} />
              ) : (
                <AiOutlineHeart />
              )}
            </IconButton>
            <Box ml={1}>
              <Typography variant="body2" align="right">Saved</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  renderDeadline = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <AiFillClockCircle />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Submit before</Typography>
          <Typography variant="body2" noWrap color="textSecondary">{moment(value).fromNow(true)}</Typography>
        </Box>
      </Box>
    </Box>
  )

  renderEntryCount = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <AiFillDollarCircle />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Entries</Typography>
          <Typography variant="body2" noWrap color="textSecondary">{value ? 'Verified' : 'Not verified'}</Typography>
        </Box>
      </Box>
    </Box>
  )

  renderReview = (count, average) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <AiFillStar />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>{pluralize('review', count, true)}</Typography>
          <Box style={{ lineHeight: 1 }}>
            <Rating name="read-only" value={average} readOnly size="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  )

  renderStatus = (value) => (
    <Box mr={2} display="inline-block">
      <Box display="flex" alignItems="center">
        <Avatar className={this.props.classes.actionIcon}>
          <AiFillEnvironment />
        </Avatar>
        <Box ml={1}>
          <Typography variant="body2" noWrap>Status</Typography>
          <Typography variant="body2" noWrap color="textPrimary">{value}</Typography>
        </Box>
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
        <Typography variant="subtitle2">Project type</Typography>
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
            label={<Typography variant="body2">Fixed price</Typography>}
            onClick={() => {}}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={<Typography variant="body2">Hourly</Typography>}
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
)(FindContest);