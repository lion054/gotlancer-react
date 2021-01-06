import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
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
import { CompactCard } from '../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
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
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link href="/settings">Settings</Link>
                <Typography color="textSecondary">Membership</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Membership</Typography>
            </Box>
            <Box m={-2}>
              <Grid container>
                <Grid item md={6} sm={8} xs={12}>
                  <Box p={2}>
                    <Divider />
                    <Box mt={2}>
                      <Typography variant="subtitle1">Your current membership package</Typography>
                    </Box>
                    <Box mt={1} mb={2} display="flex">
                      <Typography variant="subtitle2">Free Membership</Typography>
                      <Box ml={1}>
                        <Typography variant="subtitle2" className={this.props.classes.active}>(Active)</Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                      <Typography variant="subtitle1">Upgrade to Pro</Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body2">Add a payment method using our secure payment system, then start your project with Gotlancer</Typography>
                    </Box>
                    <Box mt={2}>
                      <Button variant="contained">Upload File</Button>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body2">We will charge $14.99/mo</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} sm={4} xs={12}>
                  <Box p={2}>
                    <CompactCard>
                      <CardContent>
                        <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/settings/membership.svg')} />
                        <Typography variant="subtitle2">Let's make your account more secure</Typography>
                        <Typography variant="body2">Your account security: Medium</Typography>
                        <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                      </CardContent>
                    </CompactCard>
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
}

export default compose(
  withStyles(styles),
  withTheme
)(Membership);