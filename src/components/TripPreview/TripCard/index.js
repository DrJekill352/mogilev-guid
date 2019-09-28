import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { app } from '../../../firebase'
import './style.css'

class TripCard extends React.Component {
 componentDidMount() {
    const firebaseRows = app.firestore().collection('test');
    firebaseRows.onSnapshot(snapshot => {
      snapshot.docs.forEach(d => console.log('TTT', d.data()))
    })
  }

  render() {
    return (
      <Card className="card">
				<div style={{ backgroundImage: `url(${this.props.img})`}} className="trip-icon">
					{ this.props.time && !this.props.img ? <p className="time">{ this.props.time }h</p> : <div></div> }
				</div>
				<div style={{ padding: '10px' }}>
					<Typography variant="h5" component="h2">
						{ this.props.name }
					</Typography>
					<p style={{fontSize: '12px', width: '200px'}}>
            { this.props.description }
          </p>
					<Typography variant="subtitle1" color="textSecondary">
            ❤️ { this.props.likes }
          </Typography>
				</div>
				<div style={{ flexGrow: 1 }}></div>
      </Card>
    )
  }
}

export default TripCard;
