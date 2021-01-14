import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { AiFillDelete } from 'react-icons/ai';
import { FiSettings, FiThumbsUp } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import faker from 'faker';
import { compose } from 'redux';

import SideBar from './SideBar';
import CompactPagination from '../../components/CompactPagination';

const styles = (theme) => ({
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
  bannerThumb: {
    height: 160,
    borderRadius: 4
  },
  iconButton: {
    padding: theme.spacing(1)
  },
  menuItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    '&:hover > .MuiListItemIcon-root > .MuiBox-root > svg': {
      color: theme.palette.primary.main
    },
    '&:hover > .MuiListItemText-root > .MuiTypography-root': {
      color: theme.palette.primary.main
    }
  },
  noImage: {
    height: 192,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `solid 1px ${theme.palette.divider}`,
    borderBottom: `solid 1px ${theme.palette.divider}`
  }
});

class Entries extends PureComponent {
  state = {
    banner: {
      thumb: faker.image.image(),
      ticketNum: faker.random.number({ min: 100, max: 1000 }),
      details: faker.lorem.sentence(),
      author: faker.name.findName(),
      country: faker.address.country(),
    },
    records: [],
    actionsEl: null,
    actionsId: ''
  }

  componentDidMount() {
    const records = [];
    for (let i = 0; i < 9; i++) {
      records.push({
        id: uuidv4(),
        ticketNum: faker.random.number({ min: 100, max: 1000 }),
        author: faker.name.findName(),
        thumb: faker.image.image(),
        score: faker.random.number({ min: 0, max: 5 }),
        likes: faker.random.number({ min: 0, max: 1000 }),
        liked: faker.random.boolean(),
        status: faker.random.arrayElement(['Winner', 'Rejected', 'Withdrawn'])
      });
    }
    this.setState({ records });
  }

  handleScore = (index) => (e, newValue) => {
    const records = cloneDeep(this.state.records);
    records[index].score = newValue;
    this.setState({ records });
  }

  handleLike = (index) => () => {
    const records = cloneDeep(this.state.records);
    if (!records[index].liked) {
      records[index].liked = true;
      records[index].likes++;
    } else {
      records[index].liked = false;
      records[index].likes--;
    }
    this.setState({ records });
  }

  render = () => (
    <Box className={this.props.classes.outerMargin}>
      <Grid container>
        <Grid item xs={12}>
          <Box className={this.props.classes.innerPadding}>
            {this.renderBanner()}
          </Box>
        </Grid>
        <Grid item md={9} xs={12}>
          <Grid container>
            {this.state.records.map((record, index) => (
              <Grid key={index} item md={4} sm={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <Box
                    border={`solid 1px ${this.props.theme.palette.divider}`}
                    borderRadius={8}
                    bgcolor={this.props.theme.palette.background.default}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" m={1}>
                      <Typography variant="body2">#{record.ticketNum} by {record.author}</Typography>
                      <IconButton className={this.props.classes.iconButton} onClick={(e) => this.onOpenActionsMenu(e, record.id)}>
                        <FiSettings size={20} />
                      </IconButton>
                      {this.renderActionsMenu(record.id)}
                    </Box>
                    {record.status === 'Rejected' ? (
                      <Box className={this.props.classes.noImage}>
                        <Box textAlign="center">
                          <TiCancel size={32} color={this.props.theme.palette.action.active} />
                          <Typography variant="body1" style={{ textTransform: 'uppercase' }}>{record.status}</Typography>
                        </Box>
                      </Box>
                    ) : record.status === 'Withdrawn' ? (
                      <Box className={this.props.classes.noImage}>
                        <Box textAlign="center">
                          <AiFillDelete size={32} color={this.props.theme.palette.action.active} />
                          <Typography variant="body1" style={{ textTransform: 'uppercase' }}>{record.status}</Typography>
                        </Box>
                      </Box>
                    ) : (
                      <img alt="" src={record.thumb} style={{ width: '100%', height: 192 }} />
                    )}
                    <Box display="flex" justifyContent="space-between" alignItems="center" m={1}>
                      <Rating name={`${record.id}-score`} value={record.score} size="small" onChange={this.handleScore(index)} />
                      <Box display="flex" alignItems="center">
                        <IconButton className={this.props.classes.iconButton} onClick={this.handleLike(index)}>
                          <FiThumbsUp size={20} color={record.liked ? this.props.theme.palette.success.main : this.props.theme.palette.action.active} />
                        </IconButton>
                        <Typography variant="body2">{record.likes}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box my={2}>
            <CompactPagination />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <SideBar />
        </Grid>
      </Grid>
    </Box>
  )

  renderBanner = () => (
    <Box
      border={`solid 1px ${colors.yellow[700]}`}
      borderRadius={this.props.theme.spacing(1)}
      bgcolor={colors.yellow[50]}
      display="flex"
      alignItems="center"
    >
      <Box className={this.props.classes.innerPadding}>
        <img alt="" src={this.state.banner.thumb} className={this.props.classes.bannerThumb} />
      </Box>
      <Box flex={1}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box className={this.props.classes.innerPadding}>
              <Typography variant="subtitle1">Winner Selected</Typography>
              <Typography variant="body2">Entry No: #{this.state.banner.ticketNum}</Typography>
              <Typography variant="body2">Details: {this.state.banner.details}</Typography>
              <Typography variant="body2">Author: {this.state.banner.author}</Typography>
              <Typography variant="body2">Country: {this.state.banner.country}</Typography>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box className={this.props.classes.innerPadding}>
              <Typography variant="body2">Final Steps:</Typography>
              <Typography variant="body2">Complete few more steps to complete this contest</Typography>
              <Typography variant="body2">1. IP Agreement sign</Typography>
              <Typography variant="body2">2. File Handover</Typography>
              <Typography variant="body2">3. Release Fund</Typography>
              <Typography variant="body2">4. Provide Feedback to freelancer</Typography>
              <Button variant="contained">Handover File</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )

  onOpenActionsMenu = (e, id) => this.setState({
    actionsEl: e.currentTarget,
    actionsId: id
  })

  onCloseActionsMenu = () => this.setState({
    actionsEl: null,
    actionsId: ''
  })

  renderActionsMenu = (id) => (
    <Menu
      id={`${id}-actions-menu`}
      anchorEl={this.state.actionsEl}
      keepMounted
      open={this.state.actionsId === id}
      onClose={this.onCloseActionsMenu}
      getContentAnchorEl={null} // menu should be display below anchor
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // menu should be display below anchor
      transformOrigin={{ vertical: 'top', horizontal: 'right' }} // menu should be display below anchor
    >
      <MenuItem disableGutters className={this.props.classes.menuItem} onClick={this.onCloseActionsMenu}>
        <ListItemText primary="Select Winner" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem disableGutters className={this.props.classes.menuItem} onClick={this.onCloseActionsMenu}>
        <ListItemText primary="Reject Design" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem disableGutters className={this.props.classes.menuItem} onClick={this.onCloseActionsMenu}>
        <ListItemText primary="Block Designer" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
    </Menu>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Entries);