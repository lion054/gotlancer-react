import React, { PureComponent } from 'react';
import {
  Box,
  Grid,
  withStyles
} from '@material-ui/core';
import faker from 'faker';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Agreement from './Agreement';
import QaStep from './QaStep';
import Finish from './Finish';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  }
});

class Exam extends PureComponent {
  state = {
    activeStep: 0,
    steps: [{
      question: 'What is Gotlancer?',
      answers: [
        'Gotlancer is the world largest freelancing and outsourcing marketplace.',
        'Gotlancer is a retail shop',
        'Gotlancer is a bricks industries',
        'Gotlancer is resturant'
      ],
      multiple: true
    },{
      question: 'What is Gotlancer?',
      answers: [
        'Gotlancer is the world largest freelancing and outsourcing marketplace.',
        'Gotlancer is a retail shop',
        'Gotlancer is a bricks industries',
        'Gotlancer is resturant'
      ],
      multiple: false
    }]
  }

  handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 })

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            {this.state.activeStep === 0 && (
              <Agreement onStart={this.handleNext} />
            )}
            {(this.state.activeStep >= 1 && this.state.activeStep <= this.state.steps.length) && (
              <QaStep {...this.state.steps[this.state.activeStep - 1]} onNext={this.handleNext} onSkip={this.handleNext} />
            )}
            {this.state.activeStep > this.state.steps.length && (
              <Finish success={faker.random.boolean()} onReset={() => this.setState({ activeStep: 0 })} />
            )}
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default withStyles(styles)(Exam);