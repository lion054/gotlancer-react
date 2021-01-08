import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardHeader,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PlaceholderSelect from '../../components/PlaceholderSelect';
import { CompactCard, formatCurrency } from '../../global';

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
  },
  avatar: {
    width: 100,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1)
    }
  }
});

class WithdrawFund extends PureComponent {
  state = {
    faqList: [],
    paymentMethods: []
  }

  componentDidMount() {
    const faqList = [];
    for (let i = 0; i < 5; i++) {
      faqList.push({
        question: 'How long take my first withdrawal?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi '
      });
    }
    const paymentMethods = [{
      avatar: require('../../assets/images/payment-method/withdraw/bank.png'),
      name: 'Bank deposit',
      fee: 0,
      processingTime: '2~3 days',
      description: 'Withdraw fund directly to your bank account (currently India and Bangladesh)'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/paypal.png'),
      name: 'PayPal',
      fee: 0,
      processingTime: '2~3 days',
      description: 'Withdraw fund to your PayPal account'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/skrill.png'),
      name: 'Skrill',
      fee: 0,
      processingTime: '2~3 days',
      description: 'Withdraw fund to your Skrill account'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/payoneer.png'),
      name: 'Payoneer',
      fee: 2,
      processingTime: '2~3 days',
      description: 'Withdraw fund to your Payoneer account'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/google-pay.png'),
      name: 'Google Pay',
      fee: 2.9,
      processingTime: '2~3 days',
      description: 'Withdraw fund to your Google Pay account (currently India only)'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/paytm.png'),
      name: 'Paytm',
      fee: 5,
      processingTime: '2~3 days',
      description: 'Wthdraw fund to your Paytm account (currently India only)'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/bkash.png'),
      name: 'bKash',
      fee: 0,
      processingTime: '2~3 days',
      description: 'Withdraw fund to your bKash account (currently Bangladesh only)'
    },{
      avatar: require('../../assets/images/payment-method/withdraw/nagad.png'),
      name: 'Nagad',
      fee: 0,
      processingTime: '2~3 days',
      description: 'Withdraw fund to your Nagad account (currently Bangladesh only)'
    }];
    this.setState({ faqList, paymentMethods });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box className={this.props.classes.innerPadding} my={6}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    {this.renderRequestCard()}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    {this.renderFaqCard()}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    {this.renderPaymentMethodList()}
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

  renderRequestCard = () => (
    <CompactCard>
      <CardHeader
        title="Request Withdrawal"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
      />
      <Divider />
      <CardContent>
        <Box
          className={this.props.classes.innerPadding}
          borderRadius={4}
          bgcolor={colors.red[100]}
          color={colors.red[900]}
        >
          <Typography variant="body2">Sorry you can not withdraw fund, because your KYC not verified with us. Please <Link href="#">verify your KYC</Link> for withdraw fund from your wallet.</Typography>
        </Box>
        <Box my={1}>
          <Typography variant="body2">Your available balance</Typography>
        </Box>
        <Box color={this.props.theme.palette.success.main}>
          <Typography variant="h6">{formatCurrency(150)}</Typography>
        </Box>
        <Box mt={2} mb={1}>
          <Typography variant="body2">Enter withdraw amount</Typography>
        </Box>
        <OutlinedInput
          margin="dense"
          startAdornment={(
            <InputAdornment position="start" className={this.props.classes.moneyPrefix}>
              <AttachMoney />
            </InputAdornment>
          )}
          style={{
            width: 240
          }}
        />
        <Box my={1}>
          <Typography variant="body2">Minimum withdrawal $30 USD.</Typography>
        </Box>
        <Box
          className={this.props.classes.innerPadding}
          border={`solid 1px ${colors.yellow[700]}`}
          borderRadius={4}
          bgcolor={colors.yellow[50]}
        >
          <Typography variant="body2">As you’re Indian, you will received</Typography>
          <Box color={this.props.theme.palette.success.main}>
            <Typography variant="subtitle1">₹2100.00 INR</Typography>
          </Box>
          <Typography variant="body2">Current exchange rate $1 USD = ₹70 INR</Typography>
        </Box>
        <Box mt={2} mb={1}>
          <Typography variant="body2">Select an account</Typography>
        </Box>
        <PlaceholderSelect
          fullWidth
          margin="dense"
          variant="outlined"
          placeholder="Select one"
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
        </PlaceholderSelect>
        <Box mt={2} mb={1}>
          <FormControlLabel
            control={(
              <Checkbox onClick={(e) => e.stopPropagation()} />
            )}
            label={(
              <Box>
                <Typography variant="subtitle1" color="error">Urgent withdrawal?</Typography>
                <Typography variant="body2">We will charge $5 from your wallet. You will received fund  in 3 to 6hours</Typography>
              </Box>
            )}
            onClick={() => {}}
          />
        </Box>
        <Button variant="contained">Withdraw Now</Button>
      </CardContent>
    </CompactCard>
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

  renderPaymentMethodList = () => (
    <CompactCard>
      <CardHeader
        title={(
          <Box className={this.props.classes.outerMargin} flex={1}>
            <Grid container>
              <Grid item md={3} xs={6}>
                <Box className={this.props.classes.innerPadding}>
                  <Typography variant="subtitle1">Payment method</Typography>
                </Box>
              </Grid>
              <Grid item md={1} xs={2}>
                <Box className={this.props.classes.innerPadding}>
                  <Typography variant="subtitle1">Fee</Typography>
                </Box>
              </Grid>
              <Grid item md={2} xs={4}>
                <Box className={this.props.classes.innerPadding}>
                  <Typography variant="subtitle1">Processing time</Typography>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <Typography variant="subtitle1">Description</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      />
      <Divider />
      <CardContent className="noVertPadding">
        <List disablePadding>
          {this.state.paymentMethods.map(({ avatar, name, fee, processingTime, description }, index) => (
            <ListItem key={index} disableGutters divider>
              <Box className={this.props.classes.outerMargin} flex={1}>
                <Grid container alignItems="center">
                  <Grid item md={3} xs={6}>
                    <Box className={this.props.classes.innerPadding} display="flex" alignItems="center">
                      <Box className={this.props.classes.avatar}>
                        <img alt="" src={avatar} style={{ maxWidth: '100%', height: 'auto' }} />
                      </Box>
                      <Typography variant="body1">{name}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={1} xs={2}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body1">{fee}%</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={2} xs={4}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body1">{processingTime}</Typography>
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      <Typography variant="body1">{description}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box className={this.props.classes.innerPadding}>
          <Typography variant="body2">Note</Typography>
          <Typography variant="body2">Withdrawal are processed very business day, as long as the requests are lodged before 7am IST India.</Typography>
        </Box>
      </CardContent>
    </CompactCard>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(WithdrawFund);