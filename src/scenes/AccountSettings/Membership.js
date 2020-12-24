import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
  },
  active: {
    color: theme.palette.success.main
  }
})

class Membership extends PureComponent {
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
                <Typography color="textSecondary">Membership</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5" color="textPrimary">Membership</Typography>
            </Box>
            <Grid container>
              <Grid item lg={6}>
                <Box>
                  <Divider />
                  <Box mt={2}>
                    <Typography variant="subtitle1" color="textPrimary">Your current membership package</Typography>
                  </Box>
                  <Box mt={1} mb={2} display="flex">
                    <Typography variant="subtitle2" color="textSecondary">Free Membership</Typography>
                    <Box ml={1}>
                      <Typography variant="subtitle2" className={this.props.classes.active}>(Active)</Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box mt={2}>
                    <Typography variant="subtitle1" color="textPrimary">Upgrade to Pro</Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body2" color="textSecondary">Add a payment method using our secure payment system, then start your project with Gotlancer</Typography>
                  </Box>
                  <Box mt={2}>
                    <Button variant="contained">Upload File</Button>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body2" color="textSecondary">We will charge $14.99/mo</Typography>
                  </Box>
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
}

export default compose(
  withStyles(styles),
  withTheme
)(Membership);