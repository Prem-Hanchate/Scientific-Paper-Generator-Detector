import { useCallback, useEffect, useState } from 'react';
import { useAppContext, actions, actionTypes } from '../context/AppContext';

// Custom hook for file upload functionality
export const useFileUpload = () => {
  const { state, dispatch } = useAppContext();
  const [dragActive, setDragActive] = useState(false);

  // File validation
  const validateFile = useCallback((file) => {
    const { maxFileSize, allowedFormats } = state.preferences;
    const errors = [];

    // Check file size
    if (file.size > maxFileSize) {
      errors.push(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size (${(maxFileSize / 1024 / 1024).toFixed(2)}MB)`);
    }

    // Check file format
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      errors.push(`File format ${fileExtension} is not supported. Allowed formats: ${allowedFormats.join(', ')}`);
    }

    return errors;
  }, [state.preferences]);

  // Extract file metadata
  const extractMetadata = useCallback(async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
        const characterCount = content.length;
        const lineCount = content.split('\n').length;

        resolve({
          wordCount,
          characterCount,
          lineCount,
          size: file.size,
          sizeFormatted: formatFileSize(file.size),
          type: file.type,
          lastModified: new Date(file.lastModified),
          readingTime: Math.ceil(wordCount / 200) // Assuming 200 words per minute
        });
      };
      reader.readAsText(file);
    });
  }, []);

  // Upload files with validation and metadata extraction
  const uploadFiles = useCallback(async (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    // Validate each file
    for (const file of fileArray) {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        errors.push({ file: file.name, errors: fileErrors });
      } else {
        validFiles.push(file);
      }
    }

    // Show errors if any
    if (errors.length > 0) {
      errors.forEach(error => {
        dispatch(actions.addNotification({
          type: 'error',
          title: 'File Upload Error',
          message: `${error.file}: ${error.errors.join(', ')}`
        }));
      });
    }

    // Process valid files
    if (validFiles.length > 0) {
      dispatch(actions.addFiles(validFiles));

      // Extract metadata for each file
      for (const file of validFiles) {
        try {
          const metadata = await extractMetadata(file);
          dispatch({
            type: actionTypes.UPDATE_FILE_PROGRESS,
            payload: { fileId: `${file.name}-${Date.now()}`, progress: 100, metadata }
          });
        } catch (error) {
          console.warn('Failed to extract metadata for', file.name, error);
        }
      }

      dispatch(actions.addNotification({
        type: 'success',
        title: 'Files Uploaded',
        message: `Successfully uploaded ${validFiles.length} file(s)`
      }));
    }
  }, [dispatch, validateFile, extractMetadata]);

  // Handle drag and drop
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFiles(e.dataTransfer.files);
    }
  }, [uploadFiles]);

  // Remove file
  const removeFile = useCallback((fileId) => {
    dispatch(actions.removeFile(fileId));
    dispatch(actions.addNotification({
      type: 'info',
      title: 'File Removed',
      message: 'File has been removed from the queue'
    }));
  }, [dispatch]);

  // Clear all files
  const clearFiles = useCallback(() => {
    dispatch(actions.clearFiles());
    dispatch(actions.addNotification({
      type: 'info',
      title: 'Files Cleared',
      message: 'All files have been removed'
    }));
  }, [dispatch]);

  return {
    uploadedFiles: state.uploadedFiles,
    processingFiles: state.processingFiles,
    completedFiles: state.completedFiles,
    uploadProgress: state.uploadProgress,
    dragActive,
    uploadFiles,
    removeFile,
    clearFiles,
    handleDrag,
    handleDrop
  };
};

// Custom hook for analysis functionality
export const useAnalysis = () => {
  const { state, dispatch } = useAppContext();

  // Simulated AI detection indicators
  const detectionMetrics = [
    "Repetitive sentence structures",
    "Unusual statistical claims",
    "Generic methodology descriptions",
    "Inconsistent citation patterns",
    "Overly perfect language flow",
    "Missing experimental nuances",
  ];

  // Analyze a single file
  const analyzeFile = useCallback(async (fileId) => {
    const file = state.uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    dispatch({ type: actionTypes.START_ANALYSIS });
    dispatch({ type: actionTypes.START_FILE_PROCESSING, payload: fileId });

    // Simulate analysis delay with progress updates
    const analysisSteps = [
      'Preprocessing text...',
      'Extracting features...',
      'Running AI detection algorithms...',
      'Analyzing writing patterns...',
      'Calculating confidence scores...',
      'Generating report...'
    ];

    for (let i = 0; i < analysisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({
        type: actionTypes.UPDATE_FILE_PROGRESS,
        payload: { fileId, progress: ((i + 1) / analysisSteps.length) * 100 }
      });
    }

    // Generate analysis results
    const aiProbability = Math.random() * 100;
    const suspiciousElements = detectionMetrics.filter(() => Math.random() > 0.6);

    const analysisResult = {
      fileId,
      filename: file.name,
      aiProbability,
      confidence: Math.random() * 30 + 70,
      suspiciousElements,
      verdict: aiProbability > 60 
        ? "Likely AI-Generated"
        : aiProbability > 30
        ? "Possibly AI-Generated"
        : "Likely Human-Written",
      recommendations: [
        "Cross-reference citations for authenticity",
        "Verify statistical claims with original data",
        "Check for logical consistency in methodology",
        "Assess novelty of claimed contributions",
      ],
      detailedAnalysis: {
        sentenceComplexity: Math.random() * 10 + 1,
        vocabularyDiversity: Math.random() * 100,
        coherenceScore: Math.random() * 10,
        citationPattern: Math.random() > 0.5 ? 'Regular' : 'Irregular',
        statisticalClaims: Math.floor(Math.random() * 20),
      },
      completedAt: new Date()
    };

    dispatch({ type: actionTypes.SET_ANALYSIS_RESULT, payload: analysisResult });
    dispatch({ type: actionTypes.COMPLETE_FILE_PROCESSING, payload: { fileId, status: 'completed' } });
    dispatch({ type: actionTypes.COMPLETE_ANALYSIS });

    dispatch(actions.addNotification({
      type: 'success',
      title: 'Analysis Complete',
      message: `Analysis completed for ${file.name}`
    }));

    return analysisResult;
  }, [state.uploadedFiles, dispatch]);

  // Analyze multiple files
  const analyzeAllFiles = useCallback(async () => {
    const unanalyzedFiles = state.uploadedFiles.filter(f => 
      f.status === 'uploaded' && !f.analysisResult
    );

    if (unanalyzedFiles.length === 0) {
      dispatch(actions.addNotification({
        type: 'warning',
        title: 'No Files to Analyze',
        message: 'Please upload files first'
      }));
      return;
    }

    dispatch(actions.addNotification({
      type: 'info',
      title: 'Batch Analysis Started',
      message: `Analyzing ${unanalyzedFiles.length} file(s)`
    }));

    // Analyze files sequentially to avoid overwhelming the UI
    for (const file of unanalyzedFiles) {
      await analyzeFile(file.id);
    }

    dispatch(actions.addNotification({
      type: 'success',
      title: 'Batch Analysis Complete',
      message: `Completed analysis of ${unanalyzedFiles.length} file(s)`
    }));
  }, [state.uploadedFiles, dispatch, analyzeFile]);

  return {
    analysisResults: state.analysisResults,
    isAnalyzing: state.isAnalyzing,
    analyzeFile,
    analyzeAllFiles
  };
};

// Custom hook for theme management
export const useTheme = () => {
  const { state, dispatch } = useAppContext();

  const toggleDarkMode = useCallback(() => {
    dispatch(actions.toggleDarkMode());
  }, [dispatch]);

  const setTheme = useCallback((isDark) => {
    dispatch({ type: actionTypes.SET_THEME, payload: isDark });
  }, [dispatch]);

  return {
    darkMode: state.darkMode,
    toggleDarkMode,
    setTheme
  };
};

// Custom hook for notifications
export const useNotifications = () => {
  const { state, dispatch } = useAppContext();

  const addNotification = useCallback((notification) => {
    dispatch(actions.addNotification(notification));
  }, [dispatch]);

  const removeNotification = useCallback((notificationId) => {
    dispatch(actions.removeNotification(notificationId));
  }, [dispatch]);

  const clearAllNotifications = useCallback(() => {
    state.notifications.forEach(notification => {
      dispatch(actions.removeNotification(notification.id));
    });
  }, [state.notifications, dispatch]);

  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};

// Custom hook for paper generation
export const usePaperGeneration = () => {
  const { state, dispatch } = useAppContext();

  const generatePaper = useCallback(async () => {
    dispatch(actions.startGeneration());

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const topics = [
      "Machine Learning Applications in Climate Modeling",
      "Quantum Computing Algorithms for Drug Discovery",
      "Blockchain Technology in Healthcare Data Management",
      "Neural Networks for Autonomous Vehicle Navigation",
      "AI-Driven Personalized Medicine Approaches",
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    const paper = {
      id: Date.now(),
      title: `${randomTopic}: A Comprehensive Analysis`,
      abstract: `This study presents a novel approach to ${randomTopic.toLowerCase()}. Through extensive experimentation with a dataset of 10,000 samples, we demonstrate significant improvements over existing methods. Our proposed algorithm achieves 94.2% accuracy, representing a 15% improvement over state-of-the-art approaches. The methodology combines advanced statistical techniques with modern computational frameworks. Results indicate substantial potential for real-world applications. These findings contribute meaningfully to the field and suggest directions for future research.`,
      introduction: `The field of ${randomTopic.toLowerCase()} has seen remarkable advances in recent years. However, existing approaches face several limitations that hinder practical implementation. This paper addresses these challenges through a novel methodology that combines theoretical foundations with empirical validation. Our contributions include: (1) development of an improved algorithmic framework, (2) comprehensive evaluation on benchmark datasets, and (3) analysis of real-world applicability. The remainder of this paper is organized as follows: Section 2 reviews related work, Section 3 presents our methodology, Section 4 discusses experimental results, and Section 5 concludes with future directions.`,
      dataset: {
        name: `${randomTopic.split(" ")[0]} Research Dataset v2.1`,
        samples: Math.floor(Math.random() * 50000) + 5000,
        features: Math.floor(Math.random() * 20) + 5,
        description: "Synthetically generated dataset with balanced class distribution and comprehensive feature coverage.",
        accuracy: (Math.random() * 10 + 90).toFixed(1) + "%",
        precision: (Math.random() * 5 + 92).toFixed(2),
        recall: (Math.random() * 5 + 91).toFixed(2),
      },
      aiGenerated: true,
      detectionHints: ["Repetitive sentence structures", "Unusual statistical claims", "Generic methodology descriptions"].slice(0, Math.floor(Math.random() * 3) + 2),
      generatedAt: new Date()
    };

    dispatch(actions.setGeneratedPaper(paper));
    dispatch({ type: actionTypes.ADD_TO_GENERATION_HISTORY, payload: paper });

    dispatch(actions.addNotification({
      type: 'success',
      title: 'Paper Generated',
      message: 'AI-generated paper is ready for review'
    }));

    return paper;
  }, [dispatch]);

  return {
    generatedPaper: state.generatedPaper,
    generationHistory: state.generationHistory,
    isGenerating: state.isGenerating,
    generatePaper
  };
};

// Utility function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};