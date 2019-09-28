import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { app } from '../../../firebase'
import './style.css'

const imgLink = 'http://vandrouka.by/wp-content/uploads/2012/11/Mogilev.jpg';

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
					<Typography variant="subtitle1" color="textSecondary">
            { this.props.distance }m from you {this.props.places ? `${this.props.places} places` : ``} ❤️ { this.props.likes }
          </Typography>
				</div>
				<div style={{ flexGrow: 1 }}></div>
				<div style={{ height: '100%', width: '60px', fontSize: 20 }}>
					<p style={{ textAlign: 'center', lineHeight: '33px' }}>></p>
				</div>
      </Card>
    )
  }
}

export default TripCard;
