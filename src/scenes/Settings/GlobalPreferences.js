import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import TimezoneSelect from 'react-timezone-select';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoadingButton from '../../components/LoadingButton';

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
  }
})

class GlobalPreferences extends PureComponent {
  state = {
    currentEntry: '',
    language: 'English',
    timeZone: {},
    loading: false
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link color="inherit" href="/settings">Settings</Link>
                <Typography color="textSecondary">Global preferences</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Global preferences</Typography>
            </Box>
            <Box m={-2}>
              <Grid container>
                <Grid item md={6} sm={8} xs={12}>
                  <Box p={2}>
                    {this.renderEntry({
                      id: 'Language',
                      title: 'Preferred language',
                      formattedValue: this.state.language,
                      details: (
                        <Box width="100%">
                          <TextField
                            select
                            variant="outlined"
                            value={this.state.language}
                            onChange={e => this.setState({ language: e.target.value })}
                            fullWidth
                          >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Chinese">Chinese</MenuItem>
                          </TextField>
                        </Box>
                      )
                    })}
                    {this.renderEntry({
                      id: 'TimeZone',
                      title: 'Time zone',
                      formattedValue: this.state.timeZone.label,
                      details: (
                        <Box width="100%">
                          <TimezoneSelect
                            value={this.state.timeZone}
                            onChange={(timeZone) => this.setState({ timeZone })}
                          />
                        </Box>
                      )
                    })}
                  </Box>
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} sm={4} xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardContent>
                        <img alt="" className={this.props.classes.cardIcon} src={require('../../assets/images/settings/global-preferences.svg')} />
                        <Typography variant="subtitle2">Global preferences</Typography>
                        <Typography variant="body2">Changing your cur rency updates how you see prices. You can change how you get payments in your payments &amp; payouts preferences.</Typography>
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

  getExpandIcon(id) {
    let color = this.props.theme.palette.action.disabled;
    if (this.state.currentEntry === '') {
      color = this.props.theme.palette.success.main;
    } else if (this.state.currentEntry === id) {
      color = this.props.theme.palette.success.main;
    }
    return (
      <Typography variant="body2" style={{ color }}>{this.state.currentEntry === id ? 'Cancel' : 'Edit'}</Typography>
    );
  }

  renderEntry = ({ id, title, formattedValue, details }) => (
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
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          {this.state.currentEntry !== id && (
            <Typography variant="body1">{formattedValue}</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          {details}
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title="Save"
              loading={this.state.currentEntry === id && this.state.loading}
              onClick={() => {
                this.setState({ loading: true });
                setTimeout(() => this.setState({ loading: false, currentEntry: '' }), 3000);
              }}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(GlobalPreferences);