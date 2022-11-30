'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilities = require('@dnd-kit/utilities');

function createSnapModifier(gridSize) {
  return ({
    transform
  }) => ({ ...transform,
    x: Math.ceil(transform.x / gridSize) * gridSize,
    y: Math.ceil(transform.y / gridSize) * gridSize
  });
}

const restrictToHorizontalAxis = ({
  transform
}) => {
  return { ...transform,
    y: 0
  };
};

function restrictToBoundingRect(transform, rect, boundingRect) {
  const value = { ...transform
  };

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}

const restrictToParentElement = ({
  containerNodeRect,
  draggingNodeRect,
  transform
}) => {
  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
};

const restrictToFirstScrollableAncestor = ({
  draggingNodeRect,
  transform,
  scrollableAncestorRects
}) => {
  const firstScrollableAncestorRect = scrollableAncestorRects[0];

  if (!draggingNodeRect || !firstScrollableAncestorRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, firstScrollableAncestorRect);
};

const restrictToVerticalAxis = ({
  transform
}) => {
  return { ...transform,
    x: 0
  };
};

const restrictToWindowEdges = ({
  transform,
  draggingNodeRect,
  windowRect
}) => {
  if (!draggingNodeRect || !windowRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};

const snapCenterToCursor = ({
  activatorEvent,
  draggingNodeRect,
  transform
}) => {
  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = utilities.getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left;
    const offsetY = activatorCoordinates.y - draggingNodeRect.top;
    return { ...transform,
      x: transform.x + offsetX - draggingNodeRect.width / 2,
      y: transform.y + offsetY - draggingNodeRect.height / 2
    };
  }

  return transform;
};

exports.createSnapModifier = createSnapModifier;
exports.restrictToFirstScrollableAncestor = restrictToFirstScrollableAncestor;
exports.restrictToHorizontalAxis = restrictToHorizontalAxis;
exports.restrictToParentElement = restrictToParentElement;
exports.restrictToVerticalAxis = restrictToVerticalAxis;
exports.restrictToWindowEdges = restrictToWindowEdges;
exports.snapCenterToCursor = snapCenterToCursor;
//# sourceMappingURL=modifiers.cjs.development.js.map
