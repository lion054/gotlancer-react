import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  InputBase,
  Link,
  Paper,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight, ExpandLess, ExpandMore, Language } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  expandIcon: { // Avoid rotation of collapse icon
    '&$expanded': {
      transform: 'unset'
    }
  },
  expanded: {}, // Avoid rotation of collapse icon
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  },
  addressBar: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  addressText: {
    padding: theme.spacing(1, 0),
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  copyButton: {
    minWidth: theme.spacing(12)
  },
  inviteButton: {
    minWidth: theme.spacing(18)
  },
  sharePanel: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  }
})

const SuccessButton = withStyles((theme) => ({
  root: {
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  }
}))(Button);

class InviteFriends extends PureComponent {
  state = {
    url: 'https://www.gotlancer.com/apurbad19/ref-2021154',
    currentEntry: null,
    language: 'English',
    timeZone: {}
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link color="inherit" href="/settings">Settings</Link>
                <Typography color="textSecondary">Invite friends</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Invite friends to join the Gotlancer community</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6} sm={7} xs={12}>
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">Once a user register through your referal link and spend $100 with gotlancer you will get $30.</Typography>
                </Box>
                <Box mb={2}>
                  {this.renderAddressBar()}
                </Box>
                <Box mb={2}>
                  {this.renderSharePanel()}
                </Box>
              </Grid>
              <Grid item md={3} sm={1} />
              <Grid item md={3} sm={4} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardContent>
                    <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/settings/invite-friends.svg')} />
                    <Typography variant="subtitle2">Track your referrals</Typography>
                    <Typography variant="body2">Changing your cur rency updates how you see prices. You can change how you get payments in your payments &amp; payouts preferences.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Grid container spacing={4}>
                <Grid item sm={4} xs={12}>
                  <Language />
                  <Typography variant="subtitle1">Lorem Ipsum</Typography>
                  <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Language />
                  <Typography variant="subtitle1">Lorem Ipsum</Typography>
                  <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Language />
                  <Typography variant="subtitle1">Lorem Ipsum</Typography>
                  <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                  {this.renderEntry({
                    id: 1,
                    title: 'How much will my friend get when I invite them?',
                    details: (
                      <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                    )
                  })}
                  {this.renderEntry({
                    id: 2,
                    title: 'My friend has invited me to Airbnb but I haven`t received a coupon.?',
                    details: (
                      <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                    )
                  })}
                  {this.renderEntry({
                    id: 3,
                    title: 'How much will my friend get when I invite them?',
                    details: (
                      <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                    )
                  })}
                  {this.renderEntry({
                    id: 4,
                    title: 'How much will my friend get when I invite them?',
                    details: (
                      <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                    )
                  })}
                </Grid>
                <Grid item md={4} xs={12}>
                  <Typography variant="subtitle2">Common questions</Typography>
                  <Typography variant="body2">Check out these answers to common questions and review other programme information in the Help Centre.</Typography>
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

  renderAddressBar = () => (
    <Paper variant="outlined" component="form" className={this.props.classes.addressBar}>
      <Box flex="1" className={this.props.classes.addressText}>{this.state.url}</Box>
      <Button size="large" className={this.props.classes.copyButton}>Copy Link</Button>
      <SuccessButton variant="contained" size="large" className={this.props.classes.inviteButton}>Invite Friends</SuccessButton>
    </Paper>
  )

  renderSharePanel = () => (
    <Paper variant="outlined" className={this.props.classes.sharePanel}>
      <Typography variant="subtitle2">Share Gotlancer with friends</Typography>
      <Box mt={1}>
        <Typography variant="body2">Email friends who've never tried Gotlancer, and we’ll send them a reminder, too.</Typography>
      </Box>
      <Box mt={1}>
        <Paper variant="outlined" className={this.props.classes.addressBar}>
          <InputBase placeholder="Enter email address" style={{ flex: 1 }} />
          <Button variant="contained" color="default" size="large">Send</Button>
        </Paper>
      </Box>
      <Box mt={1}>
        <Typography variant="body2">Enter one email at a time</Typography>
      </Box>
    </Paper>
  )

  getExpandIcon(id) {
    return this.state.currentEntry === id ? <ExpandLess /> : <ExpandMore />;
  }

  renderEntry = ({ id, title, details }) => (
    <Accordion expanded={this.state.currentEntry === id}>
      <AccordionSummary
        expandIcon={this.getExpandIcon(id)}
        classes={{
          expandIcon: this.props.classes.expandIcon, // Avoid rotation of collapse icon
          expanded: this.props.classes.expanded // Avoid rotation of collapse icon
        }}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        onClick={() => {
          if (this.state.currentEntry === id) {
            this.setState({ currentEntry: '' });
          } else {
            this.setState({ currentEntry: id });
          }
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          {details}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(InviteFriends);