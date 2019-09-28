import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import MapIcon from '@material-ui/icons/Map';
import ListAltIcon from '@material-ui/icons/ListAlt';

import TripCard from './TripCard';

import { app } from '../../firebase'
import './index.css'

const tripData = [
	{
		img: 'http://vandrouka.by/wp-content/uploads/2012/11/Mogilev.jpg',
		name: 'Ratusha',
    description: 'adfgdfgkk sldkjfgl ljhsdlfg hwlerhg lkjdlkfjg kjl',
		distance: 1250,
		likes: 46
	},
	{
		name: 'Maslennikov Museum',
    img: 'http://photos.wikimapia.org/p/00/01/89/87/00_big.jpg',
		distance: 390,
		likes: 19,
	},
	{
		name: 'The Skywatcher',
    img: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fbelarusfacts.by%2Fupload%2Fphotos%2Fphoto_about%2Fp7200004_1.jpg&f=1&nofb=1',
		distance: 180,
		likes: 28,
	}
]

export class TripPreview extends React.Component {

  componentDidMount() {
    const firebaseRows = app.firestore().collection('test');
    firebaseRows.onSnapshot(snapshot => {
      snapshot.docs.forEach(d => console.log('TTT', d.data()))
    })
  }

  render() {
    return (
      <div className="root">
				<div>
					<div>
						<div className="list-header">
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg>               
              </Button>
							<p>{tripData.length} places total</p>
				      <div style={{ flexGrow: 1 }}></div>
							<Fab color="primary" className="menu-button">
								<MapIcon />
							</Fab>
							<Fab color="primary" className="menu-button">
								<ListAltIcon />
							</Fab>
						</div>
					</div>
					<Stepper orientation="vertical">
						{tripData.map((trip, index) => (
							<Step key={trip.name}>
                <StepLabel>{trip.distance}m</StepLabel>
								<TripCard img={ trip.img } description={ trip.description } time={ trip.time } places={ trip.places } name={ trip.name } likes={ trip.likes }/>
							</Step>
						))}
					</Stepper>
				</div>
			</div>
    )
  }
}

export default TripPreview;
