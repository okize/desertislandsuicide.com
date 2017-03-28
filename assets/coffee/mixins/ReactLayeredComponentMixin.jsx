import React from "react";
import ReactDOM from "react-dom";

let ReactLayeredComponentMixin = {
  componentWillUnmount() {
    this._unrenderLayer();
    return document.body.removeChild(this._target);
  },
  componentDidUpdate() {
    return this._renderLayer();
  },
  componentDidMount() {
    // Appending to the body is easier than managing the z-index of everything on the page.
    // It's also better for accessibility and makes stacking a snap (since components will stack
    // in mount order).
    this._target = document.createElement("div");
    document.body.appendChild(this._target);
    return this._renderLayer();
  },
  _renderLayer() {
    // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
    // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
    // entirely different part of the page.
    return ReactDOM.render(this.renderLayer(), this._target);
  },
  _unrenderLayer() {
    return React.unmountComponentAtNode(this._target);
  },
  _getLayerNode() {
    return ReactDOM.findDOMNode(this._target);
  }
};

export default ReactLayeredComponentMixin;
