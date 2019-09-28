import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import { app } from '../../firebase'
import './index.css'


const propTypes = {}
const defaultProps = {}


const tileData = [
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
				<GridList cellHeight={180} cols={1} className="grid-list">
					{tileData.map(tile => (
						<GridListTile>
							<Card className="card">

							</Card>
						</GridListTile>
					))}
				</GridList>
			</div>
    )
  }
}

TripSelectorComponent.defaultProps = defaultProps
TripSelectorComponent.propTypes = propTypes
TripSelectorComponent.displayName = 'TripSelectorComponent'
