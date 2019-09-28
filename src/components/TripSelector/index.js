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


const propTypes = {}
const defaultProps = {}


const tileData = [
	{
		img: 'http://vandrouka.by/wp-content/uploads/2012/11/Mogilev.jpg',
		name: 'test',
		distance: 300,
		likes: 26
	},
	{
		time: 1.6,
		name: 'test',
		distance: 300,
		likes: 26,
		places: 6
	},
	{
		title: 'test'
	},
	{
		title: 'test'
	},
	{
		title: 'test'
	},
	{
		title: 'test'
	},
	{
		title: 'test'
	},
	{
		title: 'test'
	},
	{
		title: 'test'
	}
]

export class TripSelectorComponent extends React.Component {

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
							<p>{tileData.length} places total</p>
							<Fab color="primary" className="menu-button">
								<SearchIcon />
							</Fab>
						</ListSubheader>
					</div>
					<GridList cellHeight={90} cols={1} className="grid-list">
						{tileData.map(tile => (
							<GridListTile>
								<TripCard img={ tile.img } time={ tile.time } places={ tile.places } name={ tile.name } distance={ tile.distance } likes={ tile.likes }/>
							</GridListTile>
						))}
					</GridList>
				</div>
			</div>
    )
  }
}

TripSelectorComponent.defaultProps = defaultProps
TripSelectorComponent.propTypes = propTypes
TripSelectorComponent.displayName = 'TripSelectorComponent'
