import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  List,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SwitchListItem from '../../components/SwitchListItem';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  }
})

class Notifications extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link color="inherit" href="/account_settings">Account</Link>
                <Typography color="textSecondary">Notifications</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5" color="textPrimary">Notifications</Typography>
            </Box>
            <Grid container>
              <Grid item lg={6}>
                <Box>
                  <Divider />
                  {this.renderSection({
                    title: 'Messages',
                    subtitle: 'Add a payment method using our secure payment system,'
                  })}
                  <List>
                    <Divider />
                    <SwitchListItem title="Email" />
                    <SwitchListItem title="Text messages" />
                    <SwitchListItem
                      title="Browser notifications"
                      subtitle="Receive notifications outside of your browser on either desktop or mobile web"
                    />
                  </List>
                  {this.renderSection({
                    title: 'Reminder',
                    subtitle: 'Receive booking reminders, requests to write a review, pricing notices, and other reminders related to your activities on Gotlancer.'
                  })}
                  <List>
                    <Divider />
                    <SwitchListItem title="Email" />
                    <SwitchListItem title="Text messages" />
                    <SwitchListItem
                      title="Browser notifications"
                      subtitle="Receive notifications outside of your browser on either desktop or mobile web"
                    />
                  </List>
                  {this.renderSection({
                    title: 'Project Related',
                    subtitle: 'Receive booking reminders, requests to write a review, pricing notices, and other reminders related to your activities on Gotlancer.'
                  })}
                  <List>
                    <Divider />
                    <SwitchListItem title="Awarded" />
                    <SwitchListItem title="Receive Payment" />
                    <SwitchListItem
                      title="Created Dispute"
                      subtitle="Receive notifications outside of your browser on either desktop or mobile web"
                    />
                  </List>
                </Box>
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={4}>
                <Card className={this.props.classes.card}>
                  <CardContent>
                    <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/account-settings/membership.svg')} />
                    <Typography variant="subtitle2">Let's make your account more secure</Typography>
                    <Typography variant="body2">Your account security: Medium</Typography>
                    <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  renderSection = ({ title, subtitle }) => (
    <Fragment>
      <Box mt={2}>
        <Typography variant="subtitle1" color="textPrimary">{title}</Typography>
      </Box>
      <Box mt={1} mb={1}>
        <Typography variant="subtitle2" color="textSecondary">{subtitle}</Typography>
      </Box>
    </Fragment>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Notifications);