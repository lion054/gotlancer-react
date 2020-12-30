import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
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
  cardHeader: {
    backgroundColor: theme.palette.background.default
  },
  inputContainer: {
    backgroundColor: theme.palette.action.disabledBackground
  },
  input: {
    backgroundColor: theme.palette.background.paper
  }
})

class DepositFund extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Typography variant="h5">Deposit fund</Typography>
            </Box>
            <Box p={-2}>
              <Grid container>
                <Grid item md={6} sm={8} xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        className={this.props.classes.cardHeader}
                        title="Add fund to your account"
                        titleTypographyProps={{
                          variant: 'h6'
                        }}
                      />
                      <Divider />
                      <CardContent>
                        <Typography variant="subtitle1">How much balance do you need?</Typography>
                        <Typography variant="body2">Type an amount more then $10.  Cent (.) not allowed.</Typography>
                        <Box mt={2}>
                          <OutlinedInput
                            className={this.props.classes.inputContainer}
                            startAdornment={(
                              <InputAdornment position="start">$</InputAdornment>
                            )}
                            inputProps={{
                              className: this.props.classes.input
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} sm={4} xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardContent>
                        <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/settings/membership.svg')} />
                        <Typography variant="subtitle2">Let's make your account more secure</Typography>
                        <Typography variant="body2">Your account security: Medium</Typography>
                        <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                      </CardContent>
                    </Card>
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
)(DepositFund);