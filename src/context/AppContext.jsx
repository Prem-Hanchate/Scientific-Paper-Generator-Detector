import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  // Theme state
  darkMode: false,
  
  // Tab state
  activeTab: 'generator',
  
  // Generator state
  generatedPaper: null,
  isGenerating: false,
  generationHistory: [],
  
  // File handling state
  uploadedFiles: [],
  processingFiles: [],
  completedFiles: [],
  analysisResults: [],
  isAnalyzing: false,
  uploadProgress: {},
  
  // UI state
  notifications: [],
  isLoading: false,
  errors: [],
  
  // User preferences
  preferences: {
    autoAnalyze: true,
    showDetectionHints: true,
    saveHistory: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFormats: ['.txt', '.pdf', '.docx', '.rtf'],
  }
};

// Action types
export const actionTypes = {
  // Theme actions
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_THEME: 'SET_THEME',
  
  // Tab actions
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  
  // Generator actions
  START_GENERATION: 'START_GENERATION',
  COMPLETE_GENERATION: 'COMPLETE_GENERATION',
  SET_GENERATED_PAPER: 'SET_GENERATED_PAPER',
  ADD_TO_GENERATION_HISTORY: 'ADD_TO_GENERATION_HISTORY',
  
  // File handling actions
  ADD_FILES: 'ADD_FILES',
  REMOVE_FILE: 'REMOVE_FILE',
  START_FILE_PROCESSING: 'START_FILE_PROCESSING',
  UPDATE_FILE_PROGRESS: 'UPDATE_FILE_PROGRESS',
  COMPLETE_FILE_PROCESSING: 'COMPLETE_FILE_PROCESSING',
  SET_ANALYSIS_RESULT: 'SET_ANALYSIS_RESULT',
  START_ANALYSIS: 'START_ANALYSIS',
  COMPLETE_ANALYSIS: 'COMPLETE_ANALYSIS',
  CLEAR_FILES: 'CLEAR_FILES',
  
  // UI actions
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
  ADD_ERROR: 'ADD_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  
  // Preferences actions
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  RESET_PREFERENCES: 'RESET_PREFERENCES',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode
      };
      
    case actionTypes.SET_THEME:
      return {
        ...state,
        darkMode: action.payload
      };
      
    case actionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
      
    case actionTypes.START_GENERATION:
      return {
        ...state,
        isGenerating: true,
        errors: []
      };
      
    case actionTypes.COMPLETE_GENERATION:
      return {
        ...state,
        isGenerating: false
      };
      
    case actionTypes.SET_GENERATED_PAPER:
      return {
        ...state,
        generatedPaper: action.payload,
        isGenerating: false
      };
      
    case actionTypes.ADD_TO_GENERATION_HISTORY:
      return {
        ...state,
        generationHistory: [action.payload, ...state.generationHistory.slice(0, 9)] // Keep last 10
      };
      
    case actionTypes.ADD_FILES:
      const newFiles = action.payload.map(file => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploaded', // uploaded, processing, completed, error
        progress: 0,
        metadata: null,
        analysisResult: null,
        uploadedAt: new Date()
      }));
      
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...newFiles]
      };
      
    case actionTypes.REMOVE_FILE:
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(f => f.id !== action.payload),
        processingFiles: state.processingFiles.filter(f => f.id !== action.payload),
        completedFiles: state.completedFiles.filter(f => f.id !== action.payload),
        analysisResults: state.analysisResults.filter(r => r.fileId !== action.payload)
      };
      
    case actionTypes.START_FILE_PROCESSING:
      const fileToProcess = state.uploadedFiles.find(f => f.id === action.payload);
      return {
        ...state,
        processingFiles: [...state.processingFiles, { ...fileToProcess, status: 'processing' }],
        uploadedFiles: state.uploadedFiles.map(f => 
          f.id === action.payload ? { ...f, status: 'processing' } : f
        )
      };
      
    case actionTypes.UPDATE_FILE_PROGRESS:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.payload.fileId]: action.payload.progress
        },
        uploadedFiles: state.uploadedFiles.map(f =>
          f.id === action.payload.fileId 
            ? { ...f, progress: action.payload.progress }
            : f
        )
      };
      
    case actionTypes.COMPLETE_FILE_PROCESSING:
      const completedFile = state.processingFiles.find(f => f.id === action.payload.fileId);
      return {
        ...state,
        processingFiles: state.processingFiles.filter(f => f.id !== action.payload.fileId),
        completedFiles: [...state.completedFiles, { ...completedFile, ...action.payload }],
        uploadedFiles: state.uploadedFiles.map(f =>
          f.id === action.payload.fileId 
            ? { ...f, status: 'completed', ...action.payload }
            : f
        )
      };
      
    case actionTypes.SET_ANALYSIS_RESULT:
      return {
        ...state,
        analysisResults: [
          ...state.analysisResults.filter(r => r.fileId !== action.payload.fileId),
          action.payload
        ],
        uploadedFiles: state.uploadedFiles.map(f =>
          f.id === action.payload.fileId 
            ? { ...f, analysisResult: action.payload }
            : f
        )
      };
      
    case actionTypes.START_ANALYSIS:
      return {
        ...state,
        isAnalyzing: true
      };
      
    case actionTypes.COMPLETE_ANALYSIS:
      return {
        ...state,
        isAnalyzing: false
      };
      
    case actionTypes.CLEAR_FILES:
      return {
        ...state,
        uploadedFiles: [],
        processingFiles: [],
        completedFiles: [],
        analysisResults: [],
        uploadProgress: {}
      };
      
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            ...action.payload,
            timestamp: new Date()
          }
        ]
      };
      
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
      
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
      
    case actionTypes.ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, {
          id: Date.now(),
          ...action.payload,
          timestamp: new Date()
        }]
      };
      
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      };
      
    case actionTypes.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };
      
    case actionTypes.RESET_PREFERENCES:
      return {
        ...state,
        preferences: initialState.preferences
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      dispatch({ type: actionTypes.SET_THEME, payload: savedTheme === 'dark' });
    } else {
      dispatch({ type: actionTypes.SET_THEME, payload: systemPrefersDark });
    }

    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('app-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: actionTypes.UPDATE_PREFERENCES, payload: preferences });
      } catch (error) {
        console.warn('Failed to load preferences from localStorage:', error);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
  }, [state.darkMode]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('app-preferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (state.notifications.length > 0) {
      const latestNotification = state.notifications[state.notifications.length - 1];
      const timer = setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: latestNotification.id });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.notifications]);

  const value = {
    state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Action creators for common actions
export const actions = {
  toggleDarkMode: () => ({ type: actionTypes.TOGGLE_DARK_MODE }),
  
  setActiveTab: (tab) => ({ type: actionTypes.SET_ACTIVE_TAB, payload: tab }),
  
  startGeneration: () => ({ type: actionTypes.START_GENERATION }),
  completeGeneration: () => ({ type: actionTypes.COMPLETE_GENERATION }),
  setGeneratedPaper: (paper) => ({ type: actionTypes.SET_GENERATED_PAPER, payload: paper }),
  
  addFiles: (files) => ({ type: actionTypes.ADD_FILES, payload: files }),
  removeFile: (fileId) => ({ type: actionTypes.REMOVE_FILE, payload: fileId }),
  clearFiles: () => ({ type: actionTypes.CLEAR_FILES }),
  
  addNotification: (notification) => ({ type: actionTypes.ADD_NOTIFICATION, payload: notification }),
  removeNotification: (notificationId) => ({ type: actionTypes.REMOVE_NOTIFICATION, payload: notificationId }),
  
  addError: (error) => ({ type: actionTypes.ADD_ERROR, payload: error }),
  clearErrors: () => ({ type: actionTypes.CLEAR_ERRORS }),
  
  updatePreferences: (preferences) => ({ type: actionTypes.UPDATE_PREFERENCES, payload: preferences })
};