'use strict';

import React from 'react';
import {Table, Alert} from 'react-bootstrap'
import _ from 'lodash'
import cls from 'classes'

require('styles//LifeTable.styl');


class LifeTableComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  r_row(row, rowIdx) {
    let cellSize = 960 / this.props.size.width
    let cellStyle = {
      width: cellSize,
      height: cellSize
    }

    return (
      <tr key={rowIdx}>
        {_.map(row, (cell, cellIdx) => {
          return <td key={`${rowIdx}${cellIdx}`}
                     style={cellStyle}
                     className={!!cell ? "is-alive" : "is-dead"} />
        })}
      </tr>
    )
  }

  render() {
    return (
      <Table className="lifetable-component">
        <tbody>
          {_.map(this.props.cells, (row, rowIdx) => this.r_row(row))}
        </tbody>
      </Table>
    );
  }
}

LifeTableComponent.displayName = 'LifeTableComponent';

LifeTableComponent.propTypes = {
  cells: React.PropTypes.array.isRequired
};

export default LifeTableComponent;
