import React, { PureComponent } from 'react';
import {
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  withStyles
} from '@material-ui/core';
import { Apple, Shop, Facebook, Twitter, Language, LinkedIn, YouTube } from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 12,
    fontWeight: 'bold'
  },
  label: {
    color: theme.palette.text.primary,
    fontSize: 14
  }
});

class Footer extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Grid container justify="center">
        <Grid item lg={8}>
          <Grid container>
            <Grid item lg={3}>
              <List>
                <ListItem>
                  <ListItemText classes={{ primary: this.props.classes.title }} primary="NETWORK" />
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Categories</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Projects</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Freelancers</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Contest</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Offers</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Escrow</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Affiliate Program</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Desktop App download</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={3}>
              <List>
                <ListItem>
                  <ListItemText classes={{ primary: this.props.classes.title }} primary="NETWORK" />
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Categories</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Projects</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Freelancers</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Contest</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Browse Offers</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Escrow</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Affiliate Program</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Desktop App download</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={3}>
              <List>
                <ListItem>
                  <ListItemText classes={{ primary: this.props.classes.title }} primary="COMPANY" />
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">About Us</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Careers</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Press</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Trust, Safety &amp; Security</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Privacy Policy</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Accessibility</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Contact Us</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Terms and Conditions</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Code of Conduct</Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={3}>
              <List>
              <ListItem>
                  <ListItemText classes={{ primary: this.props.classes.title }} primary="FREELANCERS" />
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Freelancers by Skill</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Freelancers in USA</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Freelancers in UK</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Freelancers in Canada</Link>
                </ListItem>
                <ListItem>
                  <Link className={this.props.classes.label} href="#">Freelancers in Australia</Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item lg={6}>
              <Typography>&copy; 2020 Gotlancer, Inc. All rights reserved.</Typography>
              <Link className={this.props.classes.label} href="#">Privacy</Link>
              <Link className={this.props.classes.label} href="#">Terms</Link>
              <Link className={this.props.classes.label} href="#">Sitemap</Link>
            </Grid>
            <Grid item lg={6}>
              <Language />
              <Link className={this.props.classes.label} href="#">English (US)</Link>
              <Shop />
              <Apple />
              <Facebook />
              <Twitter />
              <LinkedIn />
              <YouTube />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Footer);