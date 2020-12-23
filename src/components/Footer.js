import React, { PureComponent } from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  MenuItem,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Apple, Shop, Facebook, Twitter, Language, LinkedIn, YouTube } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.action.selected
  },
  logoWrapper: {
    display: 'inline',
    width: theme.spacing(16)
  },
  logo: {
    width: theme.spacing(16)
  }
});

class Footer extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} xs={12}>
          <Grid container>
            <Grid item md={3} xs={6}>
              <List>
                <ListItem>
                  <Typography component="div" variant="body2" color="textPrimary">
                    <Box fontWeight="fontWeightBold">NETWORK</Box>
                  </Typography>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Categories</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Projects</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Freelancers</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Contest</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Offers</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Escrow</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Affiliate Program</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Desktop App download</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={6}>
              <List>
                <ListItem>
                  <Typography component="div" variant="body2" color="textPrimary">
                    <Box fontWeight="fontWeightBold">NETWORK</Box>
                  </Typography>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Categories</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Projects</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Freelancers</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Contest</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Browse Offers</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Escrow</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Affiliate Program</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Desktop App download</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={6}>
              <List>
                <ListItem>
                  <Typography component="div" variant="body2" color="textPrimary">
                    <Box fontWeight="fontWeightBold">COMPANY</Box>
                  </Typography>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">About Us</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Careers</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Press</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Trust, Safety &amp; Security</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Privacy Policy</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Accessibility</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Contact Us</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Terms and Conditions</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Code of Conduct</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={6}>
              <List>
                <ListItem>
                  <Typography component="div" variant="body2" color="textPrimary">
                    <Box fontWeight="fontWeightBold">FREELANCERS</Box>
                  </Typography>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Freelancers by Skill</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Freelancers in USA</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Freelancers in UK</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Freelancers in Canada</Link>
                </ListItem>
                <ListItem>
                  <Link variant="body2" color="textPrimary" href="#">Freelancers in Australia</Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
          {(this.props.width === 'xl' || this.props.width === 'lg' || this.props.width === 'md') && this.renderDesktop()}
          {(this.props.width === 'sm' || this.props.width === 'xs') && this.renderMobile()}
        </Grid>
        <Grid item lg={2} />
      </Grid>
    </div>
  )

  renderDesktop = () => (
    <Box display="flex" alignItems="center" mt={1}>
      <Box alignItems="center">
        <MenuItem disableGutters className={this.props.classes.logoWrapper} onClick={() => this.props.history.push('/')}>
          <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo-long.svg')} />
        </MenuItem>
        <Box display="inline" ml={1}>
          <Typography variant="caption" color="textPrimary">&copy; 2020 Gotlancer, Inc. All rights reserved.</Typography>
        </Box>
        <Box display="inline" ml={1.5}>
          <Link variant="body2" color="textPrimary" href="#">Privacy</Link>
        </Box>
        <Box display="inline" ml={1.5}>
          <Link variant="body2" color="textPrimary" href="#">Terms</Link>
        </Box>
        <Box display="inline" ml={1.5}>
          <Link variant="body2" color="textPrimary" href="#">Sitemap</Link>
        </Box>
      </Box>
      <div style={{ flex: 1 }} />
      <Box alignItems="center">
        <IconButton>
          <Language style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Shop style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Apple style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Facebook style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Twitter style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <LinkedIn style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <YouTube style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
      </Box>
    </Box>
  )

  renderMobile = () => (
    <Box alignItems="center" mt={1}>
      <Box alignItems="center">
        <MenuItem disableGutters className={this.props.classes.logoWrapper} onClick={() => this.props.history.push('/')}>
          <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo-long.svg')} />
        </MenuItem>
        <Box display="inline" ml={1}>
          <Typography variant="caption" color="textPrimary">&copy; 2020 Gotlancer, Inc. All rights reserved.</Typography>
        </Box>
        <Box display="inline" ml={1.5}>
          <Link variant="body2" color="textPrimary" href="#">Privacy</Link>
        </Box>
        <Box display="inline" ml={1.5}>
          <Link variant="body2" color="textPrimary" href="#">Terms</Link>
        </Box>
        <Box display="inline" ml={1.5}>
          <Link variant="body2" color="textPrimary" href="#">Sitemap</Link>
        </Box>
      </Box>
      <Box alignItems="center">
        <IconButton>
          <Language style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Shop style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Apple style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Facebook style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <Twitter style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <LinkedIn style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
        <IconButton>
          <YouTube style={{ color: this.props.theme.palette.text.secondary }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default compose(
  withRouter,
  withWidth(),
  withStyles(styles),
  withTheme
)(Footer);