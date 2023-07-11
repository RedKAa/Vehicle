import { useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';

const ResoDraggable = ({ id, children, ...rest }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} {...rest}>
      {props.children}
    </button>
  );
};

export default ResoDraggable;
