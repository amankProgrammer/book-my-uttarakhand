import React, { useRef } from 'react';
import DestinationsList from './DestinationsList';
import useAutoScroll from '../hooks/useAutoScroll';

export default function DestinationsContainer({ items, speed = 60 }) {
  const rowRef = useRef(null);
  useAutoScroll(rowRef, speed);

  return <DestinationsList items={items} rowRef={rowRef} />;
}
