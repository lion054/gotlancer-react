import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  OutlinedInput,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { cloneDeep } from 'lodash';
import { compose } from 'redux';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UploadPreview from '../../../components/UploadPreview';
import SelectBadge from './SelectBadge';
import { CompactCard } from '../../../global';

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
  }
});

const maxCharacters = 100;

class SubmitDesign extends PureComponent {
  state = {
    text: '',
    solo: true,
    stockName: '',
    stockUrl: '',
    stockPurchaseRequired: false,
    stocks: [],
    faqList: []
  }

  componentDidMount() {
    const faqList = [];
    for (let i = 0; i < 5; i++) {
      faqList.push({
        question: 'How long take my first withdrawal?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi '
      });
    }
    this.setState({ faqList });
  }

  handleChange = (e) => {
    if (e.target.value.length > maxCharacters) {
      e.stopPropagation();
      return false;
    }
    this.setState({ text: e.target.value });
  }

  handleNewStock = () => {
    const stocks = cloneDeep(this.state.stocks);
    stocks.push({
      name: this.state.stockName,
      url: this.state.stockUrl,
      purchaseRequired: this.state.stockPurchaseRequired
    });
    this.setState({
      stocks,
      stockName: '',
      stockUrl: '',
      stockPurchaseRequired: false
    });
  }

  handleDeleteStock = (index) => () => {
    const stocks = cloneDeep(this.state.stocks);
    stocks.splice(index, 1);
    this.setState({ stocks });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Grid container>
              <Grid item md={9} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <CompactCard>
                    <CardHeader
                      title="Submit Desgin"
                      titleTypographyProps={{
                        variant: 'subtitle1'
                      }}
                    />
                    <Divider />
                    <CardContent>
                      <Box my={1}>
                        <Typography variant="body1">Entry Title</Typography>
                      </Box>
                      <OutlinedInput
                        fullWidth
                        margin="dense"
                      />
                      <Box my={1}>
                        <Typography variant="body1">Tell us more about your entry</Typography>
                        <Typography variant="body2">Start with a bit about yourself or your business, and include an overview of what you need one.</Typography>
                      </Box>
                      <OutlinedInput
                        fullWidth
                        margin="dense"
                        multiline
                        rows={5}
                        value={this.state.text}
                        onChange={this.handleChange}
                      />
                      <Typography variant="body2" color="textSecondary" align="right">{this.state.text.length}/{maxCharacters}</Typography>
                      <Box mt={2} className={this.props.classes.outerMargin}>
                        <Grid container>
                          <Grid item xs={6}>
                            <Box className={this.props.classes.innerPadding}>
                              <Box my={1}>
                                <Typography variant="body2">Original upload</Typography>
                              </Box>
                              <UploadPreview />
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={this.props.classes.innerPadding}>
                              <Box my={1}>
                                <Typography variant="body2">Preview upload</Typography>
                              </Box>
                              <UploadPreview />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box my={4}>
                        <Divider />
                      </Box>
                      <Box mb={4}>
                        <Typography variant="body2">Lisenced Content</Typography>
                        <Typography variant="body2">Declare any stock content used to avoid penalty.</Typography>
                        <FormControlLabel
                          checked={!this.state.solo}
                          control={(
                            <Checkbox onClick={(e) => e.stopPropagation()} />
                          )}
                          label={<Typography variant="body2">This entry contains elements I did not create.</Typography>}
                          onChange={() => this.setState({ solo: !this.state.solo })}
                        />
                        <List disablePadding>
                          {this.state.stocks.map(({ name, url, purchaseRequired }, index) => (
                            <ListItem key={index} disableGutters>
                              <ListItemText
                                primary={name}
                                primaryTypographyProps={{
                                  variant: 'body2'
                                }}
                                secondary={purchaseRequired && 'Purchase required'}
                                secondaryTypographyProps={{
                                  variant: 'body2',
                                  color: 'textSecondary'
                                }}
                              />
                              <ListItemSecondaryAction>
                                <IconButton onClick={this.handleDeleteStock(index)}>
                                  <AiOutlineClose />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                        <Box
                          display={this.state.solo ? 'none' : 'block'}
                          className={this.props.classes.innerPadding}
                          border={`solid 1px ${colors.yellow[700]}`}
                          bgcolor={colors.yellow[50]}
                        >
                          <Typography variant="body2">Stock Name</Typography>
                          <OutlinedInput
                            fullWidth
                            margin="dense"
                            value={this.state.stockName}
                            onChange={(e) => this.setState({ stockName: e.target.value })}
                            style={{ backgroundColor: this.props.theme.palette.background.paper }}
                          />
                          <Typography variant="body2">Stock Link</Typography>
                          <OutlinedInput
                            fullWidth
                            margin="dense"
                            value={this.state.stockUrl}
                            onChange={(e) => this.setState({ stockUrl: e.target.value })}
                            style={{ backgroundColor: this.props.theme.palette.background.paper }}
                          />
                          <FormControlLabel
                            checked={this.state.stockPurchaseRequired}
                            control={(
                              <Checkbox onClick={(e) => e.stopPropagation()} />
                            )}
                            label={<Typography variant="body2">Stock requires purchase</Typography>}
                            onChange={(e, newValue) => this.setState({ stockPurchaseRequired: newValue })}
                          />
                        </Box>
                        <Box mt={1}>
                          <Button variant="outlined" onClick={this.handleNewStock}>Add another</Button>
                        </Box>
                      </Box>
                      <SelectBadge noCard noSubmit />
                      <FormControlLabel
                        control={(
                          <Checkbox onClick={(e) => e.stopPropagation()} />
                        )}
                        label={<Typography variant="body2">This entry is entirely my own original work and I agree to the Gotlancer Terms &amp; Conditions.</Typography>}
                      />
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Box flex={1} textAlign="center">
                        <Button variant="contained" size="large">Yes, submit my design</Button>
                      </Box>
                    </CardActions>
                  </CompactCard>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  {this.renderFaqCard()}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
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
                primaryTypographyProps={{
                  variant: 'body1'
                }}
                secondary={faq.answer}
                secondaryTypographyProps={{
                  variant: 'body2'
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </CompactCard>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(SubmitDesign);