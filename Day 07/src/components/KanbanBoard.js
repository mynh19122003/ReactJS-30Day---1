// =============================================================================
// KANBAN BOARD COMPONENT với detailed comments
// =============================================================================
// Component này demo drag & drop functionality, complex state management
// Advanced list operations, accessibility patterns, và productivity tools
// =============================================================================

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// =============================================================================
// 1. DATA STRUCTURES & UTILITIES
// =============================================================================
// Define task priorities với colors và weights
const TASK_PRIORITIES = {
  low: { label: 'Low', color: '#28a745', weight: 1 },
  medium: { label: 'Medium', color: '#ffc107', weight: 2 },
  high: { label: 'High', color: '#fd7e14', weight: 3 },
  critical: { label: 'Critical', color: '#dc3545', weight: 4 }
};

// Define task categories với icons
const TASK_CATEGORIES = {
  feature: { label: 'Feature', icon: '✨' },
  bug: { label: 'Bug Fix', icon: '🐛' },
  improvement: { label: 'Improvement', icon: '⚡' },
  documentation: { label: 'Documentation', icon: '📚' },
  testing: { label: 'Testing', icon: '🧪' }
};

// Generate sample tasks với realistic data
const generateSampleTasks = () => {
  const taskTemplates = [
    'Implement user authentication system',
    'Fix responsive design issues on mobile',
    'Add real-time notifications',
    'Optimize database queries performance',
    'Create API documentation',
    'Write unit tests for components',
    'Implement dark mode theme',
    'Add internationalization support',
    'Fix memory leak in dashboard',
    'Design new landing page'
  ];

  const assignees = [
    { id: 'alice', name: 'Alice', avatar: '👩‍💻' },
    { id: 'bob', name: 'Bob', avatar: '👨‍🎨' },
    { id: 'charlie', name: 'Charlie', avatar: '👨‍🚀' },
    { id: 'diana', name: 'Diana', avatar: '👩‍⚕️' }
  ];

  return Array.from({ length: 12 }, (_, index) => {
    const template = taskTemplates[index % taskTemplates.length];
    const assignee = assignees[Math.floor(Math.random() * assignees.length)];
    const priority = Object.keys(TASK_PRIORITIES)[Math.floor(Math.random() * 4)];
    const category = Object.keys(TASK_CATEGORIES)[Math.floor(Math.random() * 5)];
    
    return {
      id: `task_${String(index + 1).padStart(3, '0')}`,
      title: `${template} #${index + 1}`,
      description: `Detailed description for ${template.toLowerCase()}. This task requires careful planning and execution.`,
      priority,
      category,
      assignee,
      estimatedHours: Math.floor(Math.random() * 20) + 1, // 1-20 hours
      actualHours: Math.floor(Math.random() * 10), // 0-10 hours logged
      tags: ['frontend', 'backend', 'design', 'urgent'].slice(0, Math.floor(Math.random() * 3) + 1),
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
      dueDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000), // Next 14 days
      comments: Math.floor(Math.random() * 5), // 0-5 comments
      attachments: Math.floor(Math.random() * 3), // 0-3 attachments
      blockedBy: [], // Task dependencies
      subtasks: {
        total: Math.floor(Math.random() * 6) + 1,
        completed: Math.floor(Math.random() * 4)
      }
    };
  });
};

// Initial columns configuration
const INITIAL_COLUMNS = {
  backlog: {
    id: 'backlog',
    title: '📋 Backlog',
    color: '#6c757d',
    description: 'Tasks waiting to be prioritized',
    taskIds: []
  },
  todo: {
    id: 'todo',
    title: '📝 To Do',
    color: '#007bff',
    description: 'Ready to start',
    taskIds: []
  },
  inProgress: {
    id: 'inProgress',
    title: '⚡ In Progress',
    color: '#ffc107',
    description: 'Currently being worked on',
    taskIds: []
  },
  review: {
    id: 'review',
    title: '👀 Review',
    color: '#fd7e14',
    description: 'Awaiting review/testing',
    taskIds: []
  },
  done: {
    id: 'done',
    title: '✅ Done',
    color: '#28a745',
    description: 'Completed tasks',
    taskIds: []
  }
};

// =============================================================================
// 2. TASK CARD COMPONENT
// =============================================================================
// Individual task card với drag & drop capabilities
const TaskCard = React.memo(({ 
  task, 
  onTaskUpdate, 
  onTaskDelete,
  isDragging = false,
  isDragOver = false 
}) => {
  // ============== STATE MANAGEMENT ==============
  const [isExpanded, setIsExpanded] = useState(false); // Card expansion
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [editTitle, setEditTitle] = useState(task.title);
  
  // Drag & drop refs
  const cardRef = useRef(null);
  const [dragStarted, setDragStarted] = useState(false);

  // ============== COMPUTED VALUES ==============
  // Calculate progress percentage
  const progressPercent = useMemo(() => {
    if (task.subtasks.total === 0) return 0;
    return Math.round((task.subtasks.completed / task.subtasks.total) * 100);
  }, [task.subtasks]);

  // Check if task is overdue
  const isOverdue = useMemo(() => {
    return new Date(task.dueDate) < new Date() && task.actualHours === 0;
  }, [task.dueDate, task.actualHours]);

  // Days until due date
  const daysUntilDue = useMemo(() => {
    const now = new Date();
    const due = new Date(task.dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [task.dueDate]);

  // ============== DRAG & DROP HANDLERS ==============
  // Drag start handler
  const handleDragStart = useCallback((e) => {
    setDragStarted(true);
    e.dataTransfer.setData('text/plain', task.id); // Set task ID for transfer
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    if (cardRef.current) {
      cardRef.current.style.opacity = '0.5';
    }
  }, [task.id]);

  // Drag end handler
  const handleDragEnd = useCallback((e) => {
    setDragStarted(false);
    
    // Reset visual feedback
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
    }
  }, []);

  // ============== EVENT HANDLERS ==============
  // Edit handlers
  const handleEditStart = useCallback(() => {
    setIsEditing(true);
    setEditTitle(task.title);
  }, [task.title]);

  const handleEditSave = useCallback(() => {
    if (editTitle.trim() !== task.title) {
      onTaskUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  }, [task.id, editTitle, task.title, onTaskUpdate]);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditTitle(task.title);
  }, [task.title]);

  // Priority change handler
  const handlePriorityChange = useCallback((newPriority) => {
    onTaskUpdate(task.id, { priority: newPriority });
  }, [task.id, onTaskUpdate]);

  // Delete handler
  const handleDelete = useCallback(() => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa task "${task.title}"?`)) {
      onTaskDelete(task.id);
    }
  }, [task.id, task.title, onTaskDelete]);

  // ============== MAIN RENDER ==============
  return (
    <div
      ref={cardRef}
      className={`task-card ${isDragging ? 'dragging' : ''} ${isOverdue ? 'overdue' : ''}`}
      draggable={!isEditing} // Disable drag when editing
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Task Header */}
      <div className="task-header">
        {/* Priority Indicator */}
        <div 
          className="task-priority"
          style={{ backgroundColor: TASK_PRIORITIES[task.priority].color }}
          title={`Priority: ${TASK_PRIORITIES[task.priority].label}`}
        >
          {TASK_PRIORITIES[task.priority].weight}
        </div>

        {/* Task Title */}
        <div className="task-title-section">
          {isEditing ? (
            <div className="task-edit-container" onClick={(e) => e.stopPropagation()}>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSave();
                  if (e.key === 'Escape') handleEditCancel();
                }}
                className="task-edit-input"
                autoFocus
              />
              <div className="task-edit-actions">
                <button onClick={handleEditSave}>💾</button>
                <button onClick={handleEditCancel}>❌</button>
              </div>
            </div>
          ) : (
            <h3 className="task-title" title={task.title}>
              {task.title}
            </h3>
          )}
        </div>

        {/* Task Actions */}
        <div className="task-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleEditStart} title="Edit task">✏️</button>
          <button onClick={handleDelete} title="Delete task" className="delete-btn">🗑️</button>
        </div>
      </div>

      {/* Task Metadata */}
      <div className="task-metadata">
        {/* Category Badge */}
        <span className="task-category" title={TASK_CATEGORIES[task.category].label}>
          {TASK_CATEGORIES[task.category].icon} {TASK_CATEGORIES[task.category].label}
        </span>

        {/* Due Date */}
        <span className={`task-due-date ${isOverdue ? 'overdue' : daysUntilDue <= 3 ? 'urgent' : ''}`}>
          📅 {daysUntilDue <= 0 ? 'Overdue' : `${daysUntilDue} days left`}
        </span>
      </div>

      {/* Task Progress */}
      {task.subtasks.total > 0 && (
        <div className="task-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">
            {task.subtasks.completed}/{task.subtasks.total} subtasks ({progressPercent}%)
          </span>
        </div>
      )}

      {/* Task Tags */}
      {task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map(tag => (
            <span key={tag} className="task-tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* Assignee & Stats */}
      <div className="task-footer">
        {/* Assignee */}
        <div className="task-assignee" title={task.assignee.name}>
          <span className="assignee-avatar">{task.assignee.avatar}</span>
          <span className="assignee-name">{task.assignee.name}</span>
        </div>

        {/* Task Stats */}
        <div className="task-stats">
          {task.comments > 0 && (
            <span className="stat-item" title={`${task.comments} comments`}>
              💬 {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="stat-item" title={`${task.attachments} attachments`}>
              📎 {task.attachments}
            </span>
          )}
          <span className="stat-item" title="Estimated hours">
            ⏱️ {task.estimatedHours}h
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="task-details" onClick={(e) => e.stopPropagation()}>
          <div className="task-description">
            <h4>📝 Description:</h4>
            <p>{task.description}</p>
          </div>

          {/* Priority Selector */}
          <div className="priority-selector">
            <h4>🎯 Priority:</h4>
            <div className="priority-options">
              {Object.entries(TASK_PRIORITIES).map(([key, priority]) => (
                <button
                  key={key}
                  className={`priority-option ${task.priority === key ? 'active' : ''}`}
                  style={{ backgroundColor: priority.color }}
                  onClick={() => handlePriorityChange(key)}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Tracking */}
          <div className="time-tracking">
            <h4>⏰ Time Tracking:</h4>
            <div className="time-stats">
              <span>Estimated: {task.estimatedHours}h</span>
              <span>Logged: {task.actualHours}h</span>
              <span>Remaining: {Math.max(0, task.estimatedHours - task.actualHours)}h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Set display name cho React DevTools
TaskCard.displayName = 'TaskCard';

// =============================================================================
// 3. COLUMN COMPONENT
// =============================================================================
// Kanban column với drop zone functionality
const KanbanColumn = React.memo(({ 
  column, 
  tasks, 
  onTaskMove, 
  onTaskUpdate, 
  onTaskDelete,
  onColumnUpdate 
}) => {
  // ============== STATE MANAGEMENT ==============
  const [isDragOver, setIsDragOver] = useState(false); // Drop zone state
  const [isCollapsed, setIsCollapsed] = useState(false); // Column collapse
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Title edit
  const [editTitle, setEditTitle] = useState(column.title);

  // Refs for drop zone
  const columnRef = useRef(null);

  // ============== COMPUTED VALUES ==============
  // Filter tasks for this column
  const columnTasks = useMemo(() => {
    return column.taskIds.map(taskId => tasks.find(task => task.id === taskId)).filter(Boolean);
  }, [column.taskIds, tasks]);

  // Column statistics
  const columnStats = useMemo(() => {
    const totalTasks = columnTasks.length;
    const totalHours = columnTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const completedSubtasks = columnTasks.reduce((sum, task) => sum + task.subtasks.completed, 0);
    const totalSubtasks = columnTasks.reduce((sum, task) => sum + task.subtasks.total, 0);
    
    return {
      totalTasks,
      totalHours,
      avgProgress: totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0,
      highPriorityCount: columnTasks.filter(task => ['high', 'critical'].includes(task.priority)).length
    };
  }, [columnTasks]);

  // ============== DRAG & DROP HANDLERS ==============
  // Drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  }, [isDragOver]);

  const handleDragLeave = useCallback((e) => {
    // Only set to false if leaving the column entirely
    if (!columnRef.current?.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onTaskMove(taskId, column.id);
    }
  }, [column.id, onTaskMove]);

  // ============== EVENT HANDLERS ==============
  // Column title edit handlers
  const handleTitleEditStart = useCallback(() => {
    setIsEditingTitle(true);
    setEditTitle(column.title);
  }, [column.title]);

  const handleTitleEditSave = useCallback(() => {
    if (editTitle.trim() !== column.title) {
      onColumnUpdate(column.id, { title: editTitle.trim() });
    }
    setIsEditingTitle(false);
  }, [column.id, editTitle, column.title, onColumnUpdate]);

  const handleTitleEditCancel = useCallback(() => {
    setIsEditingTitle(false);
    setEditTitle(column.title);
  }, [column.title]);

  // ============== MAIN RENDER ==============
  return (
    <div
      ref={columnRef}
      className={`kanban-column ${isDragOver ? 'drag-over' : ''} ${isCollapsed ? 'collapsed' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="column-header" style={{ borderTopColor: column.color }}>
        {/* Column Title */}
        <div className="column-title-section">
          {isEditingTitle ? (
            <div className="column-edit-container">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleEditSave();
                  if (e.key === 'Escape') handleTitleEditCancel();
                }}
                className="column-edit-input"
                autoFocus
              />
              <div className="column-edit-actions">
                <button onClick={handleTitleEditSave}>💾</button>
                <button onClick={handleTitleEditCancel}>❌</button>
              </div>
            </div>
          ) : (
            <h2 className="column-title" onClick={handleTitleEditStart}>
              {column.title}
            </h2>
          )}
          
          {/* Task Count */}
          <span className="task-count">
            {columnStats.totalTasks} {columnStats.totalTasks === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {/* Column Actions */}
        <div className="column-actions">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand column' : 'Collapse column'}
          >
            {isCollapsed ? '👁️' : '🫣'}
          </button>
        </div>
      </div>

      {/* Column Description */}
      {!isCollapsed && (
        <div className="column-description">
          {column.description}
        </div>
      )}

      {/* Column Stats */}
      {!isCollapsed && columnStats.totalTasks > 0 && (
        <div className="column-stats">
          <div className="stat-item">
            <span>⏱️ {columnStats.totalHours}h total</span>
          </div>
          <div className="stat-item">
            <span>📊 {columnStats.avgProgress}% complete</span>
          </div>
          {columnStats.highPriorityCount > 0 && (
            <div className="stat-item urgent">
              <span>🔥 {columnStats.highPriorityCount} high priority</span>
            </div>
          )}
        </div>
      )}

      {/* Tasks List */}
      {!isCollapsed && (
        <div className="column-tasks">
          {columnTasks.length === 0 ? (
            <div className="empty-column">
              <p>Drop tasks here</p>
              <div className="drop-zone-indicator">📥</div>
            </div>
          ) : (
            columnTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}
                isDragOver={isDragOver}
              />
            ))
          )}
        </div>
      )}

      {/* Drop Zone Indicator */}
      {isDragOver && !isCollapsed && (
        <div className="drop-zone-active">
          📥 Drop task here
        </div>
      )}
    </div>
  );
});

// Set display name cho React DevTools
KanbanColumn.displayName = 'KanbanColumn';

// =============================================================================
// 4. MAIN KANBAN BOARD COMPONENT
// =============================================================================
const KanbanBoard = () => {
  // ============== STATE MANAGEMENT ==============
  // Core data
  const [tasks, setTasks] = useState(() => generateSampleTasks());
  const [columns, setColumns] = useState(() => {
    // Distribute tasks randomly across columns
    const updatedColumns = { ...INITIAL_COLUMNS };
    const taskIds = tasks.map(task => task.id);
    const columnIds = Object.keys(updatedColumns);
    
    taskIds.forEach((taskId, index) => {
      const columnId = columnIds[index % columnIds.length];
      updatedColumns[columnId].taskIds.push(taskId);
    });
    
    return updatedColumns;
  });
  
  // UI state
  const [searchTerm, setSearchTerm] = useState(''); // Search filter
  const [filterPriority, setFilterPriority] = useState('all'); // Priority filter
  const [filterAssignee, setFilterAssignee] = useState('all'); // Assignee filter
  const [viewMode, setViewMode] = useState('normal'); // normal, compact, detailed
  
  // Board settings
  const [boardTitle, setBoardTitle] = useState('🚀 Sprint Development Board');
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);

  // ============== COMPUTED VALUES ==============
  // Get all unique assignees for filtering
  const allAssignees = useMemo(() => {
    const assigneeMap = new Map();
    tasks.forEach(task => {
      assigneeMap.set(task.assignee.id, task.assignee);
    });
    return Array.from(assigneeMap.values());
  }, [tasks]);

  // Filter tasks based on search và filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }
      
      // Priority filter
      if (filterPriority !== 'all' && task.priority !== filterPriority) {
        return false;
      }
      
      // Assignee filter
      if (filterAssignee !== 'all' && task.assignee.id !== filterAssignee) {
        return false;
      }
      
      return true;
    });
  }, [tasks, searchTerm, filterPriority, filterAssignee]);

  // Board statistics
  const boardStats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = columns.done.taskIds.length;
    const inProgressTasks = columns.inProgress.taskIds.length;
    const totalHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const loggedHours = tasks.reduce((sum, task) => sum + task.actualHours, 0);
    
    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalHours,
      loggedHours,
      remainingHours: totalHours - loggedHours
    };
  }, [tasks, columns]);

  // ============== EVENT HANDLERS ==============
  // Task movement handler (drag & drop)
  const handleTaskMove = useCallback((taskId, targetColumnId) => {
    setColumns(prev => {
      const updated = { ...prev };
      
      // Remove task from current column
      Object.keys(updated).forEach(columnId => {
        updated[columnId] = {
          ...updated[columnId],
          taskIds: updated[columnId].taskIds.filter(id => id !== taskId)
        };
      });
      
      // Add task to target column
      updated[targetColumnId] = {
        ...updated[targetColumnId],
        taskIds: [...updated[targetColumnId].taskIds, taskId]
      };
      
      return updated;
    });
    
    console.log(`📋 Moved task ${taskId} to ${targetColumnId}`);
  }, []);

  // Task update handler
  const handleTaskUpdate = useCallback((taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  }, []);

  // Task deletion handler
  const handleTaskDelete = useCallback((taskId) => {
    // Remove from tasks
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    // Remove from columns
    setColumns(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(columnId => {
        updated[columnId] = {
          ...updated[columnId],
          taskIds: updated[columnId].taskIds.filter(id => id !== taskId)
        };
      });
      return updated;
    });
  }, []);

  // Column update handler
  const handleColumnUpdate = useCallback((columnId, updates) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: { ...prev[columnId], ...updates }
    }));
  }, []);

  // Add new task handler
  const handleAddTask = useCallback((columnId = 'backlog') => {
    const newTask = {
      id: `task_${Date.now()}`,
      title: 'New Task',
      description: 'Task description',
      priority: 'medium',
      category: 'feature',
      assignee: allAssignees[0] || { id: 'unassigned', name: 'Unassigned', avatar: '👤' },
      estimatedHours: 1,
      actualHours: 0,
      tags: [],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      comments: 0,
      attachments: 0,
      blockedBy: [],
      subtasks: { total: 0, completed: 0 }
    };
    
    setTasks(prev => [...prev, newTask]);
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        taskIds: [...prev[columnId].taskIds, newTask.id]
      }
    }));
  }, [allAssignees]);

  // Clear filters handler
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setFilterPriority('all');
    setFilterAssignee('all');
  }, []);

  // ============== MAIN RENDER ==============
  return (
    <div className={`kanban-board ${viewMode}`}>
      {/* Board Header */}
      <div className="board-header">
        {/* Board Title */}
        <div className="board-title-section">
          {isEditingBoardTitle ? (
            <div className="board-title-edit">
              <input
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingBoardTitle(false);
                  if (e.key === 'Escape') setIsEditingBoardTitle(false);
                }}
                className="board-title-input"
                autoFocus
              />
            </div>
          ) : (
            <h1 className="board-title" onClick={() => setIsEditingBoardTitle(true)}>
              {boardTitle}
            </h1>
          )}
        </div>

        {/* Board Stats */}
        <div className="board-stats">
          <div className="stat-card">
            <span className="stat-value">{boardStats.totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{boardStats.completionRate}%</span>
            <span className="stat-label">Complete</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{boardStats.inProgressTasks}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{boardStats.remainingHours}h</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
      </div>

      {/* Board Controls */}
      <div className="board-controls">
        {/* Search và Filters */}
        <div className="search-filters">
          {/* Search Input */}
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search tasks, tags, descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">🎯 All Priorities</option>
            {Object.entries(TASK_PRIORITIES).map(([key, priority]) => (
              <option key={key} value={key}>
                {priority.label}
              </option>
            ))}
          </select>

          {/* Assignee Filter */}
          <select
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="filter-select"
          >
            <option value="all">👥 All Assignees</option>
            {allAssignees.map(assignee => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {(searchTerm || filterPriority !== 'all' || filterAssignee !== 'all') && (
            <button onClick={handleClearFilters} className="clear-filters-btn">
              🗑️ Clear Filters
            </button>
          )}
        </div>

        {/* View Controls */}
        <div className="view-controls">
          {/* View Mode Selector */}
          <div className="view-mode-selector">
            {[
              { key: 'normal', label: '📋 Normal', icon: '📋' },
              { key: 'compact', label: '📝 Compact', icon: '📝' },
              { key: 'detailed', label: '📊 Detailed', icon: '📊' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className={`view-mode-btn ${viewMode === key ? 'active' : ''}`}
                onClick={() => setViewMode(key)}
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Add Task Button */}
          <button 
            onClick={() => handleAddTask()}
            className="add-task-btn"
            title="Add new task"
          >
            ➕ Add Task
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="kanban-columns">
        {Object.values(columns).map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={filteredTasks}
            onTaskMove={handleTaskMove}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onColumnUpdate={handleColumnUpdate}
          />
        ))}
      </div>

      {/* Board Footer với Insights */}
      <div className="board-footer">
        <div className="board-insights">
          <h3>📊 Board Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <span className="insight-title">🎯 Most Active</span>
              <span className="insight-value">
                {allAssignees.reduce((max, assignee) => {
                  const count = tasks.filter(t => t.assignee.id === assignee.id).length;
                  return count > (tasks.filter(t => t.assignee.id === max.id).length || 0) ? assignee : max;
                }, allAssignees[0] || {}).name || 'N/A'}
              </span>
            </div>
            <div className="insight-card">
              <span className="insight-title">⚡ Avg Task Size</span>
              <span className="insight-value">
                {boardStats.totalTasks > 0 ? Math.round(boardStats.totalHours / boardStats.totalTasks) : 0}h
              </span>
            </div>
            <div className="insight-card">
              <span className="insight-title">🔥 Critical Tasks</span>
              <span className="insight-value">
                {tasks.filter(t => t.priority === 'critical').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <details>
            <summary>🐛 Debug Info</summary>
            <pre>
              {JSON.stringify({
                totalTasks: tasks.length,
                filteredTasks: filteredTasks.length,
                searchTerm,
                filters: { priority: filterPriority, assignee: filterAssignee },
                viewMode,
                columns: Object.keys(columns).reduce((acc, key) => {
                  acc[key] = columns[key].taskIds.length;
                  return acc;
                }, {})
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

// Export component
export default KanbanBoard;