import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  Typography,
  colors,
  fade,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRocket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  background: {
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
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: 'unset'
  },
  membershipCard: {
    [theme.breakpoints.up('sm')]: {
      width: 280
    }
  },
  basicSide: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  check: {
    marginRight: theme.spacing(1)
  }
})

export const DeepOrangeButton = withStyles((theme) => ({
  text: {
    color: colors.deepOrange[500],
    '&:hover': {
      backgroundColor: fade(colors.deepOrange[500], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  outlined: {
    color: colors.deepOrange[500],
    border: `1px solid ${fade(colors.deepOrange[500], 0.5)}`,
    '&:hover': {
      border: `1px solid ${colors.deepOrange[500]}`,
      backgroundColor: fade(colors.deepOrange[500], theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  contained: {
    color: theme.palette.common.white,
    backgroundColor: colors.deepOrange[500],
    '&:hover': {
      backgroundColor: colors.deepOrange[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: colors.deepOrange[500]
      }
    }
  },
  disabled: {}
}))(Button);

class Membership extends PureComponent {
  state = {
    grade: 'monthly',
    unit: '/mo',
    basicPrice: '9.99',
    proPrice: '29.99',
    faqList: [{
      question: 'What is Gotlancer proposal credit?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'What is Gotlancer proposal credit?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'How is Gotlancer proposal credit works?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'How is Gotlancer proposal credit works?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'Can I get proposal credit refund after purchase?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'Can I get proposal credit refund after purchase?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'How long Gotlancer proposal credit refund validity?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    },{
      question: 'How long Gotlancer proposal credit refund validity?',
      answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at '
    }]
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box textAlign="center">
              <Box mb={1}>
                <Typography variant="h5">Try a Gotlancer Membership Package</Typography>
              </Box>
              <Box mb={1} color={this.props.theme.palette.warning.main}>
                <Typography variant="body1">Save up to 20% on annual plans.</Typography>
              </Box>
              <Box mb={1}>
                <Typography variant="body2">Change plans anytime, conditions apply see FAQ.</Typography>
              </Box>
              <Box mb={2} display="flex" justifyContent="center" alignItems="center">
                <Box flex={1}>
                  <Typography variant="body2" align="right">Monthly</Typography>
                </Box>
                <Box ml={2} mr={2}>
                  <Switch checked={this.state.grade === 'yearly'} onChange={(e) => this.setState({
                    grade: e.target.checked ? 'yearly' : 'monthly',
                    unit: e.target.checked ? '/yr' : '/mo',
                    basicPrice: e.target.checked ? '95.90' : '9.99',
                    proPrice: e.target.checked ? '287.90' : '29.99'
                  })} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" align="left">Yearly</Typography>
                </Box>
              </Box>
            </Box>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <Box className={clsx(this.props.classes.innerPadding, this.props.classes.basicSide)}>
                    {this.renderBasicCard()}
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    {this.renderProCard()}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              {this.renderFaqList()}
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  renderBasicCard = () => (
    <Card elevation={0} className={clsx(this.props.classes.card, this.props.classes.membershipCard)}>
      <CardHeader
        title="Basic"
        titleTypographyProps={{
          variant: 'h6'
        }}
        subheader={(
          <Box height={65}>
            <Box display="flex" alignItems="flex-end" color={this.props.theme.palette.success.main}>
              <Box display="flex" alignItems="flex-start">
                <Typography variant="h6">$</Typography>
                <Typography variant="h4">{this.state.basicPrice}</Typography>
              </Box>
              <Typography variant="h6">{this.state.unit}</Typography>
            </Box>
            {this.state.grade === 'yearly' && (
              <Typography variant="body1" style={{ textDecoration: 'line-through' }}>119.88 {this.state.unit}</Typography>
            )}
          </Box>
        )}
        action={(
          <Box mt={1.5}>
            <FontAwesomeIcon icon={faPaperPlane} size="3x" />
          </Box>
        )}
      />
      <Divider />
      <CardContent className={this.props.classes.background}>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">20% Gotlancer fee</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">No Project Accept Fee</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">20 Skills</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Yearly Rewards</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Weekly Withdrawal Requests</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">5 Employer Followings</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1} color={this.props.theme.palette.text.disabled}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">No Free hidden entry</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1} color={this.props.theme.palette.text.disabled}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">No Free Highlighted Contest</Typography>
        </Box>
        {this.state.grade === 'monthly' ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box mr={1}>
              <DeepOrangeButton variant="text">Current Plan</DeepOrangeButton>
            </Box>
            <DeepOrangeButton variant="contained">Cancel Plan</DeepOrangeButton>
          </Box>
        ) : (
          <Box textAlign="center">
            <Button variant="contained">Upgrade Plan</Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )

  renderProCard = () => (
    <Card elevation={0} className={clsx(this.props.classes.card, this.props.classes.membershipCard)}>
      <CardHeader
        title="Pro"
        titleTypographyProps={{
          variant: 'h6'
        }}
        subheader={(
          <Box height={65}>
            <Box display="flex" alignItems="flex-end" color={this.props.theme.palette.success.main}>
              <Box display="flex" alignItems="flex-start">
                <Typography variant="h6">$</Typography>
                <Typography variant="h4">{this.state.proPrice}</Typography>
              </Box>
              <Typography variant="h6">{this.state.unit}</Typography>
            </Box>
            {this.state.grade === 'yearly' && (
              <Typography variant="body1" style={{ textDecoration: 'line-through' }}>359.88 {this.state.unit}</Typography>
            )}
          </Box>
        )}
        action={(
          <Box mt={1.5}>
            <FontAwesomeIcon icon={faRocket} size="3x" />
          </Box>
        )}
      />
      <Divider />
      <CardContent className={this.props.classes.background}>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">5% Gotlancer fee</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">No Project Accept Fee</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">50 Skills</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Monthly Rewards</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Daily Withdrawal Requests</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Unlimited Employer Followings</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Free hidden entry</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          <Box className={this.props.classes.check}>
            <Check />
          </Box>
          <Typography variant="body2">Free Highlighted Contest</Typography>
        </Box>
        <Box textAlign="center">
          {this.state.grade === 'monthly' ? (
            <Button variant="contained">Try free for 14 days</Button>
          ) : (
            <Button variant="contained">Upgrade Plan</Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )

  renderFaqList = () => (
    <Card elevation={0} className={this.props.classes.card}>
      <CardHeader
        title="Frequently asked questions"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
      />
      <Divider />
      <CardContent className={this.props.classes.background}>
        <Box className={this.props.classes.outerMargin}>
          <Grid container>
            {this.state.faqList.map((faq, index) => (
              <Grid key={index} item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <Box mb={1}>
                    <Typography variant="subtitle2">{faq.question}</Typography>
                  </Box>
                  <Typography variant="body2">{faq.answer}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Membership);