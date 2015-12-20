require('styles/Main.styl');

import React from 'react';
import update from 'react-addons-update';

import LifeTable from 'components/LifeTableComponent';
import Setup from 'components/TableSetupComponent';
import Controls from 'components/TableControlsComponent';
import Options from 'components/TableOptionsComponent';

import {Row, Coll, Grid} from "react-bootstrap";

import _ from 'lodash'


class Archiver {
  constructor(props) {
    this.archive = []
  }

  add(arr) {
    this.archive.push(arr)
  }

  get(i) {
    return this.archive[i] || []
  }

  isEqualToLastArchive(arr) {
    return _.isEqual(arr, _.last(this.archive))
  }
}


const MAP_SIZES = {
  min: 10,
  max: 50,
  default: 50
}

const GENERATION_SPEEDS = {
  fast: 100,
  middle: 250,
  slow: 500
}


class AppComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      cells: [],
      size: {
        width:  MAP_SIZES.default,
        height: MAP_SIZES.default
      },
      isPlaying: false,
      playSpeed: GENERATION_SPEEDS.fast,
      ifFinished: false,
    }


    let appArchiver = new Archiver()

    let getNeiboursOf = (ri, ci) => {
      let cells = this.state.cells
      let topNeibours = _.slice(cells[ri - 1], ci - 1, ci + 1)
      let btmNeibours = _.slice(cells[ri + 1], ci - 1, ci + 1)
      let crtNeibours = [cells[ri][ci - 1], cells[ri][ci + 1]]

      return _([]).push(topNeibours, crtNeibours, btmNeibours)
                  .flatten()
                  .compact()
                  .value()
    }

    let play = () => {
      let playTimer = setTimeout(() => {
        this.makeNextGen(play)
      }, this.state.playSpeed)
      if (!this.state.isPlaying) window.clearTimeout(playTimer)
    }


    this.setTableSize = (type, evt) => {
      let val = _.parseInt(evt.currentTarget.value)
      val = val < MAP_SIZES.min ? MAP_SIZES.min : val
      val = val > MAP_SIZES.max ? MAP_SIZES.max : val
      this.setState({
        size: update(this.state.size, {[type]: {$set: val}})
      });
    }

    this.makeStartGen = (rows, cells) => {
      let startGen = _.map(new Array(rows),
                         () => _.map(new Array(cells),
                          () => _.random(0, 1)))
      
      appArchiver.add(startGen)
      this.setState({
        cells: startGen,
        isFinished: false
      });
    }

    this.makeNextGen = (callback) => {
      let nextGen = AppComponent._mapCells(this.state.cells,
        (ri, ci, cell) => {
          let aliveNeibours = getNeiboursOf(ri, ci).length
          switch(cell){
            case 1:
              return aliveNeibours === 3 || aliveNeibours === 2 ? 1 : 0
            case 0:
              return aliveNeibours === 3 ? 1 : 0
          }
        }
      )
      
      if (appArchiver.isEqualToLastArchive(nextGen)) {
        this.setState({
          isPlaying: false,
          isFinished: true
        });
        return
      }
      appArchiver.add(nextGen)

      this.setState({
        cells: nextGen
      }, _.isFunction(callback) ? callback() : null)
    }

    this.togglePlayMode = (mode) => {
      this.setState({
        isPlaying: mode
      }, () => {
        play()
      });
    }

  }

  static _mapCells(table, fn) {
    return _.map(table, (row, rowIndex) => {
      return _.map(row, (cell, cellIndex) => {
        return fn(rowIndex, cellIndex, cell)
      })
    })
  }


  componentWillMount() {
    this.makeStartGen(this.state.size.height, this.state.size.width)
  }


  render() {
    let width = this.state.size.width || this.state.size.height
    let height = this.state.size.height || this.state.size.width

    return (
      <Grid>
        <Setup
          sizeLimits={MAP_SIZES}
          size={this.state.size}
          handleCreate={_.partial(this.makeStartGen, height, width)}
          handleChange={this.setTableSize}/>
        <Controls
          isPlaying={this.state.isPlaying}
          handleRepeat={_.partial(this.makeStartGen, height, width)}
          handlePlay={this.togglePlayMode}
          handleNext={this.makeNextGen}/>
        
        {this.state.isFinished ? 
          <h1>The game is over!</h1>
          :
          null
        }
        <LifeTable cells={this.state.cells} />
        {/*
        <Options
          handleSetSpeed={}
          handleCustomGen={} />*/}
      </Grid>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
