import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Custom hook for virtual scrolling
export function useVirtualScrolling({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollingContainerRef = useRef(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(items.length, start + visibleCount + overscan * 2);
    
    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      ...item,
      index: visibleRange.start + index
    }));
  }, [items, visibleRange]);

  // Handle scroll
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  // Calculate total height and offset
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return {
    scrollingContainerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  };
}

// Custom hook for infinite scrolling
export function useInfiniteScroll({ loadMore, hasMore, threshold = 100 }) {
  const [isFetching, setIsFetching] = useState(false);
  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetching) {
          setIsFetching(true);
          loadMore().finally(() => setIsFetching(false));
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = bottomBoundaryRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, hasMore, isFetching]);

  return { bottomBoundaryRef, isFetching };
}

// Custom hook for drag and drop
export function useDragAndDrop({ onDrop, dragType = 'default' }) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const draggedOverRef = useRef(null);

  const handleDragStart = useCallback((e, item) => {
    setIsDragging(true);
    setDraggedItem(item);
    e.dataTransfer.setData(`application/${dragType}`, JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';
  }, [dragType]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDraggedItem(null);
    draggedOverRef.current = null;
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, targetItem) => {
    e.preventDefault();
    
    try {
      const draggedData = JSON.parse(e.dataTransfer.getData(`application/${dragType}`));
      if (draggedData && targetItem && onDrop) {
        onDrop(draggedData, targetItem);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }

    setIsDragging(false);
    setDraggedItem(null);
  }, [dragType, onDrop]);

  return {
    isDragging,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };
}