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

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import TripCard from './TripCard';

import { app } from '../../firebase'
import './index.css'


const propTypes = {
	tripData: PropTypes.arrayOf(PropTypes.object)
}
const defaultProps = {}

export class TripSelector extends React.Component {

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
						<ListSubheader component="div" className="list-header">
							<Fab color="primary" className="menu-button">
								<MenuIcon />
							</Fab>
							<p>{this.props.tripData.length} places total</p>
							<Fab color="primary" className="menu-button">
								<SearchIcon />
							</Fab>
						</ListSubheader>
					</div>
					<GridList cellHeight={90} spacing={4} cols={1} className="grid-list">
						{this.props.tripData.map(trip => (
							<GridListTile>
								<TripCard img={ trip.img } time={ trip.time } places={ trip.places } name={ trip.name } distance={ trip.distance } likes={ trip.likes }/>
							</GridListTile>
						))}
					</GridList>
				</div>
			</div>
    )
  }
}

TripSelector.defaultProps = defaultProps
TripSelector.propTypes = propTypes
TripSelector.displayName = 'TripSelectorComponent'

export default TripSelector;
