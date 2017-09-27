import { Component } from 'react';
import PropTypes from 'prop-types';

import { parseColorInProps } from './parseColor';
import generateId from './generateId';

export default (Manager, propTypes = {}) => {
  const ARComponent = class extends Component {
    identifier = null;

    componentWillMount() {
      this.identifier = this.props.id || generateId();
      Manager.mount({
        id: this.identifier,
        ...parseColorInProps(this.props),
      });
    }

    componentWillUpdate(props) {
      Manager.mount({
        id: this.identifier,
        ...parseColorInProps(props),
      });
    }

    componentWillUnmount() {
      Manager.unmount(this.identifier);
    }

    render() {
      return null;
    }
  };

  ARComponent.propTypes = {
    pos: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
      frame: PropTypes.string,
    }),
    eulerAngles: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
    }),
    rotation: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
      w: PropTypes.number,
    }),
    orientation: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
      w: PropTypes.number,
    }),

    material: PropTypes.shape({
      color: PropTypes.string,
      metalness: PropTypes.number,
      roughness: PropTypes.number,
    }),
    ...propTypes,
  };

  return ARComponent;
};
