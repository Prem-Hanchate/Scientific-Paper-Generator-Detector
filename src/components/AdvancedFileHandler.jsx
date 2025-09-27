import React, { useRef, useCallback, useMemo } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  Download, 
  Eye, 
  Clock, 
  FileCheck,
  AlertCircle,
  Trash2,
  Play,
  Pause
} from 'lucide-react';
import { useFileUpload, useAnalysis } from '../hooks/useAppHooks';

const FileUploadZone = ({ onFileSelect }) => {
  const { dragActive, handleDrag, handleDrop, uploadFiles } = useFileUpload();
  const fileInputRef = useRef(null);

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  }, [uploadFiles]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div
      className={`upload-zone ${dragActive ? 'dragover' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="flex-center" style={{ 
        flexDirection: 'column',
        gap: 'var(--spacing-lg)'
      }}>
        <div style={{
          background: dragActive ? 'var(--accent-primary)' : 'var(--bg-elevated)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-lg)',
          transition: 'all var(--transition-fast)'
        }}>
          <Upload size={48} style={{ 
            color: dragActive ? 'var(--text-inverse)' : 'var(--text-muted)' 
          }} />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h4 className="text-lg" style={{ 
            fontWeight: '600',
            marginBottom: 'var(--spacing-sm)',
            color: dragActive ? 'var(--accent-primary)' : 'var(--text-primary)'
          }}>
            {dragActive ? 'Drop files here' : 'Upload Scientific Papers'}
          </h4>
          <p className="text-muted" style={{ 
            marginBottom: 'var(--spacing-lg)',
            maxWidth: '400px',
            lineHeight: '1.6'
          }}>
            Drag & drop files here, or click to browse. Supports TXT, PDF, DOCX, and RTF files up to 10MB each.
          </p>
          
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button className="btn-modern">
              <FileText size={18} />
              Choose Files
            </button>
            <span className="text-muted" style={{ 
              fontSize: '0.875rem',
              alignSelf: 'center'
            }}>
              or drag & drop
            </span>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf,.docx,.rtf"
        onChange={handleFileInput}
        multiple
        style={{ display: 'none' }}
      />
    </div>
  );
};

const FileCard = React.memo(({ file }) => {
  const { removeFile } = useFileUpload();
  const { analyzeFile } = useAnalysis();

  const handleRemove = useCallback(() => {
    removeFile(file.id);
  }, [removeFile, file.id]);

  const handleAnalyze = useCallback(() => {
    analyzeFile(file.id);
  }, [analyzeFile, file.id]);

  const statusIcon = useMemo(() => {
    switch (file.status) {
      case 'processing':
        return <div className="spinner-modern" />;
      case 'completed':
        return <FileCheck size={16} style={{ color: 'var(--accent-success)' }} />;
      case 'error':
        return <AlertCircle size={16} style={{ color: 'var(--accent-danger)' }} />;
      default:
        return <Clock size={16} style={{ color: 'var(--text-muted)' }} />;
    }
  }, [file.status]);

  const statusColor = useMemo(() => {
    switch (file.status) {
      case 'processing':
        return 'var(--accent-primary)';
      case 'completed':
        return 'var(--accent-success)';
      case 'error':
        return 'var(--accent-danger)';
      default:
        return 'var(--text-muted)';
    }
  }, [file.status]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="card-modern" style={{ 
      animation: 'slideInUp 0.3s ease-out',
      marginBottom: 'var(--spacing-md)'
    }}>
      <div className="card-body-modern" style={{ padding: 'var(--spacing-lg)' }}>
        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
          <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
            <FileText size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h4 style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: 'var(--spacing-xs)',
                color: 'var(--text-primary)'
              }}>
                {file.name}
              </h4>
              <p style={{ 
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                margin: 0
              }}>
                {formatFileSize(file.size)} • {file.type || 'Unknown type'}
              </p>
            </div>
          </div>
          
          <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
            <div className="flex-center" style={{ 
              gap: 'var(--spacing-xs)',
              color: statusColor,
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {statusIcon}
              <span style={{ textTransform: 'capitalize' }}>
                {file.status}
              </span>
            </div>
            <button
              className="btn-modern btn-secondary"
              onClick={handleRemove}
              style={{ padding: 'var(--spacing-xs)' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Progress bar for processing files */}
        {file.status === 'processing' && (
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <div className="progress-modern">
              <div 
                className="progress-bar-modern progress-primary"
                style={{ 
                  width: `${file.progress || 0}%`,
                  background: 'var(--accent-primary)'
                }}
              />
            </div>
          </div>
        )}

        {/* File metadata */}
        {file.metadata && (
          <div style={{ 
            marginBottom: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}>
            <div className="grid-2" style={{ gap: 'var(--spacing-sm)' }}>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Words:</strong> {file.metadata.wordCount?.toLocaleString() || 'N/A'}
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Reading time:</strong> {file.metadata.readingTime || 'N/A'} min
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Lines:</strong> {file.metadata.lineCount?.toLocaleString() || 'N/A'}
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <strong>Characters:</strong> {file.metadata.characterCount?.toLocaleString() || 'N/A'}
              </div>
            </div>
          </div>
        )}

        {/* Analysis result summary */}
        {file.analysisResult && (
          <div style={{
            padding: 'var(--spacing-md)',
            background: file.analysisResult.aiProbability > 60 
              ? 'color-mix(in srgb, var(--accent-danger) 10%, var(--bg-card))'
              : file.analysisResult.aiProbability > 30
              ? 'color-mix(in srgb, var(--accent-warning) 10%, var(--bg-card))'
              : 'color-mix(in srgb, var(--accent-success) 10%, var(--bg-card))',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${file.analysisResult.aiProbability > 60 
              ? 'var(--accent-danger)'
              : file.analysisResult.aiProbability > 30
              ? 'var(--accent-warning)'
              : 'var(--accent-success)'}`,
            marginBottom: 'var(--spacing-md)'
          }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
              <span style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                color: file.analysisResult.aiProbability > 60 
                  ? 'var(--accent-danger)'
                  : file.analysisResult.aiProbability > 30
                  ? 'var(--accent-warning)'
                  : 'var(--accent-success)'
              }}>
                {file.analysisResult.verdict}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                {file.analysisResult.aiProbability.toFixed(1)}% AI Probability
              </span>
            </div>
            <div className="progress-modern">
              <div 
                className="progress-bar-modern"
                style={{ 
                  width: `${file.analysisResult.aiProbability}%`,
                  background: file.analysisResult.aiProbability > 60 
                    ? 'var(--accent-danger)'
                    : file.analysisResult.aiProbability > 30
                    ? 'var(--accent-warning)'
                    : 'var(--accent-success)'
                }}
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
          {file.status === 'uploaded' && !file.analysisResult && (
            <button 
              className="btn-modern"
              onClick={handleAnalyze}
              style={{ background: 'var(--accent-secondary)' }}
            >
              <Play size={16} />
              Analyze
            </button>
          )}
          
          {file.analysisResult && (
            <button className="btn-modern btn-secondary">
              <Eye size={16} />
              View Details
            </button>
          )}
          
          <button className="btn-modern btn-secondary">
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
});

const BatchActions = React.memo(() => {
  const { uploadedFiles, clearFiles } = useFileUpload();
  const { analyzeAllFiles, isAnalyzing } = useAnalysis();

  const unanalyzedCount = useMemo(() => 
    uploadedFiles.filter(f => f.status === 'uploaded' && !f.analysisResult).length,
    [uploadedFiles]
  );

  if (uploadedFiles.length === 0) return null;

  return (
    <div className="card-modern" style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div className="card-body-modern">
        <div className="flex-between">
          <div>
            <h3 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: 'var(--spacing-xs)',
              color: 'var(--text-primary)'
            }}>
              Batch Actions
            </h3>
            <p className="text-muted" style={{ 
              fontSize: '0.875rem',
              margin: 0
            }}>
              {uploadedFiles.length} file(s) uploaded • {unanalyzedCount} pending analysis
            </p>
          </div>
          
          <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
            {unanalyzedCount > 0 && (
              <button 
                className="btn-modern"
                onClick={analyzeAllFiles}
                disabled={isAnalyzing}
                style={{ 
                  background: isAnalyzing 
                    ? 'var(--bg-tertiary)' 
                    : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                }}
              >
                {isAnalyzing ? (
                  <>
                    <div className="spinner-modern" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Analyze All ({unanalyzedCount})
                  </>
                )}
              </button>
            )}
            
            <button 
              className="btn-modern"
              onClick={clearFiles}
              style={{ background: 'var(--accent-danger)' }}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const AdvancedFileHandler = () => {
  const { uploadedFiles } = useFileUpload();

  return (
    <div className="fade-in">
      <FileUploadZone />
      
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: 'var(--spacing-2xl)' }}>
          <BatchActions />
          
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--text-primary)'
            }}>
              Uploaded Files ({uploadedFiles.length})
            </h3>
            
            <div>
              {uploadedFiles.map(file => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFileHandler;