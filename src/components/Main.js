require('styles/Main.styl');

import React from 'react';
import update from 'react-addons-update';

import LifeTable from 'components/LifeTableComponent';
import Setup from 'components/TableSetupComponent';
import Controls from 'components/TableControlsComponent';
import Options from 'components/TableOptionsComponent';

import {Row, Coll, Grid} from "react-bootstrap";

import _ from 'lodash'

class AppComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      cells: [],
      size: {
        width:  10,
        height: 10
      }
    }

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


    this.setTableSize = (type, evt) => {
      let val = _.parseInt(evt.currentTarget.value)
      this.setState({
        size: update(this.state.size, {[type]: {$set: val}})
      });
    }

    this.makeStartGen = (rows, cells) => {
      this.setState({
        cells: _.map(new Array(rows),
                         () => _.map(new Array(cells),
                          () => _.random(0, 1)))
      });
    }

    this.makeNextGen = () => {
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
      this.setState({
        cells: nextGen
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
          size={this.state.size}
          handleCreate={_.partial(this.makeStartGen, height, width)}
          handleChange={this.setTableSize}/>
        <LifeTable cells={this.state.cells} />
        <Controls
          handleNext={this.makeNextGen}/>
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
