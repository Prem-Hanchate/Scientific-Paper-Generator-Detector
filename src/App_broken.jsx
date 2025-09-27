import React, { useCallback, useMemo } from "react";
import "./App.css";
import {
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Brain,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { AppProvider } from "./context/AppContext";
import { useAppContext, actions } from "./context/AppContext";
import { useTheme, usePaperGeneration } from "./hooks/useAppHooks";
import AdvancedFileHandler from "./components/AdvancedFileHandler";
import ToastContainer from "./components/ToastContainer";

const ScientificPaperToolContent = React.memo(() => {
  const { state, dispatch } = useAppContext();
  const { darkMode, toggleDarkMode } = useTheme();
  const { generatedPaper, isGenerating, generatePaper } = usePaperGeneration();

  const handleTabChange = useCallback((tab) => {
    dispatch(actions.setActiveTab(tab));
  }, [dispatch]);

  const downloadPaper = useCallback(() => {
    if (!generatedPaper) return;

    const paperContent = `${generatedPaper.title}\n\nABSTRACT\n${generatedPaper.abstract}\n\nINTRODUCTION\n${generatedPaper.introduction}\n\nDATASET INFORMATION\nName: ${generatedPaper.dataset.name}\nSamples: ${generatedPaper.dataset.samples}\nFeatures: ${generatedPaper.dataset.features}\nAccuracy: ${generatedPaper.dataset.accuracy}\n\n--- THIS IS A SIMULATED AI-GENERATED PAPER FOR EDUCATIONAL PURPOSES ---`;

    const blob = new Blob([paperContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fake_scientific_paper.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedPaper]);



  return (
    <div style={{ minHeight: "100vh" }} className="fade-in">
      {/* Dark Mode Toggle */}
      <button 
        className="theme-toggle" 
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
          {darkMode ? 'Light' : 'Dark'}
        </span>
      </button>

      {/* Header */}
      <header style={{
        background: `linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))`,
        color: 'var(--text-inverse)',
        padding: 'var(--spacing-2xl) 0',
        marginBottom: 'var(--spacing-2xl)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
          animation: 'shimmer 3s infinite'
        }}></div>
        <div className="container-modern">
          <div className="flex-center" style={{ gap: 'var(--spacing-lg)' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-md)',
              animation: 'pulse 2s infinite'
            }}>
              <Shield size={48} />
            </div>
            <div>
              <h1 className="text-3xl" style={{ 
                fontWeight: '700', 
                marginBottom: 'var(--spacing-sm)',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                Scientific Paper AI Detection Tool
              </h1>
              <p style={{ 
                fontSize: '1.125rem', 
                opacity: '0.9',
                fontWeight: '400'
              }}>
                Educational platform for identifying AI-generated academic content
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container-modern">
        {/* Ethics Warning */}
        <div className="alert-modern alert-warning slide-in-down" role="alert">
          <AlertTriangle size={20} />
          <div>
            <h3 style={{ 
              fontWeight: '600', 
              marginBottom: 'var(--spacing-xs)',
              fontSize: '1rem'
            }}>
              Educational Purpose Only
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}>
              This tool is designed for educational awareness about AI-generated
              academic fraud. Never use generated content for actual academic
              submissions.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="nav-tabs-modern slide-in-up">
          <button
            className={`nav-tab-modern ${state.activeTab === "generator" ? "active" : ""}`}
            onClick={() => handleTabChange("generator")}
          >
            <Brain size={20} />
            <span>Paper Generator</span>
          </button>
          <button
            className={`nav-tab-modern ${state.activeTab === "detector" ? "active" : ""}`}
            onClick={() => handleTabChange("detector")}
          >
            <Eye size={20} />
            <span>AI Detector</span>
          </button>
        </nav>

        {/* Generator Tab */}
        {state.activeTab === "generator" && (
          <div className="fade-in">
            {/* Generation Controls */}
            <div className="card-modern card-elevated" style={{ marginBottom: 'var(--spacing-2xl)' }}>
              <div className="card-body-modern" style={{ 
                textAlign: 'center', 
                padding: 'var(--spacing-2xl)' 
              }}>
                <div className="flex-center" style={{ 
                  marginBottom: 'var(--spacing-xl)',
                  gap: 'var(--spacing-md)'
                }}>
                  <div style={{
                    background: 'var(--accent-primary)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--spacing-md)',
                    color: 'var(--text-inverse)'
                  }}>
                    <Brain size={32} />
                  </div>
                  <h2 className="text-2xl" style={{ fontWeight: '700' }}>
                    AI Paper Generator
                  </h2>
                </div>

                <button
                  className="btn-modern btn-large"
                  onClick={generatePaper}
                  disabled={isGenerating}
                  style={{
                    background: isGenerating 
                      ? 'var(--bg-tertiary)' 
                      : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    marginBottom: 'var(--spacing-lg)'
                  }}
                >
                  {isGenerating ? (
                    <>
                      <div className="spinner-modern"></div>
                      Generating Paper...
                    </>
                  ) : (
                    <>
                      <Brain size={20} />
                      Generate Fake Scientific Paper
                    </>
                  )}
                </button>
                <p className="text-muted" style={{ 
                  maxWidth: '500px',
                  margin: '0 auto',
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  Creates a plausible but fabricated research paper with fake
                  data for detection practice
                </p>
              </div>
            </div>

            {/* Generated Paper Display */}
            {generatedPaper && (
              <div className="card-modern slide-in-up" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div className="card-header-modern alert-danger" style={{
                  background: 'color-mix(in srgb, var(--accent-danger) 10%, var(--bg-card))',
                  borderBottom: '1px solid var(--accent-danger)'
                }}>
                  <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
                    <AlertTriangle size={20} style={{ color: 'var(--accent-danger)' }} />
                    <span style={{ 
                      color: 'var(--accent-danger)', 
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      AI-Generated Content (Educational)
                    </span>
                  </div>
                  <button
                    className="btn-modern"
                    onClick={downloadPaper}
                    style={{ background: 'var(--accent-danger)' }}
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>

                <div className="card-body-modern">
                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 className="text-xl" style={{ 
                      fontWeight: '700',
                      marginBottom: 'var(--spacing-lg)',
                      color: 'var(--text-primary)'
                    }}>
                      {generatedPaper.title}
                    </h3>
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h4 className="text-lg" style={{ 
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-md)',
                      color: 'var(--accent-primary)'
                    }}>
                      Abstract
                    </h4>
                    <p className="text-secondary" style={{ 
                      lineHeight: '1.7',
                      fontSize: '1rem'
                    }}>
                      {generatedPaper.abstract}
                    </p>
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h4 className="text-lg" style={{ 
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-md)',
                      color: 'var(--accent-primary)'
                    }}>
                      Introduction
                    </h4>
                    <p className="text-secondary" style={{ 
                      lineHeight: '1.7',
                      fontSize: '1rem'
                    }}>
                      {generatedPaper.introduction}
                    </p>
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h4 className="text-lg" style={{ 
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-md)',
                      color: 'var(--accent-primary)'
                    }}>
                      Dataset Information
                    </h4>
                    <div style={{
                      background: 'var(--bg-elevated)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--spacing-lg)',
                      border: '1px solid var(--border-light)'
                    }}>
                      <div className="grid-2">
                        <div>
                          <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Name:</strong>{" "}
                            <span className="text-secondary">{generatedPaper.dataset.name}</span>
                          </p>
                          <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Samples:</strong>{" "}
                            <span className="text-secondary">{generatedPaper.dataset.samples.toLocaleString()}</span>
                          </p>
                        </div>
                        <div>
                          <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Features:</strong>{" "}
                            <span className="text-secondary">{generatedPaper.dataset.features}</span>
                          </p>
                          <p style={{ margin: 0 }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Claimed Accuracy:</strong>{" "}
                            <span className="text-secondary">{generatedPaper.dataset.accuracy}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg" style={{ 
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-md)',
                      color: 'var(--accent-primary)'
                    }}>
                      Detection Hints
                    </h4>
                    <div className="alert-modern alert-warning">
                      <AlertTriangle size={18} />
                      <div>
                        <p style={{ 
                          fontWeight: '600',
                          marginBottom: 'var(--spacing-sm)',
                          fontSize: '0.875rem'
                        }}>
                          Signs this paper is AI-generated:
                        </p>
                        <ul style={{ 
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {generatedPaper.detectionHints.map((hint, index) => (
                            <li key={index} style={{ 
                              fontSize: '0.875rem',
                              marginBottom: 'var(--spacing-xs)',
                              paddingLeft: 'var(--spacing-md)',
                              position: 'relative'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                color: 'var(--accent-warning)'
                              }}>•</span>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detector Tab */}
                {/* Detector Tab */}
        {state.activeTab === "detector" && (
          <AdvancedFileHandler />
        )}" "}
                      <span style={{ marginLeft: 'var(--spacing-sm)' }}>
                        {uploadedFile.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Loading */}
            {isAnalyzing && (
              <div className="card-modern slide-in-up" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div className="card-body-modern" style={{ 
                  textAlign: 'center', 
                  padding: 'var(--spacing-2xl)' 
                }}>
                  <div className="spinner-modern spinner-large pulse" style={{ 
                    marginBottom: 'var(--spacing-lg)' 
                  }}></div>
                  <h4 className="text-lg" style={{ 
                    fontWeight: '600',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    Analyzing Content
                  </h4>
                  <p className="text-muted">
                    Running AI detection algorithms...
                  </p>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="card-modern slide-in-up" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div className="card-header-modern" style={{
                  background: analysisResult.aiProbability > 60 
                    ? 'color-mix(in srgb, var(--accent-danger) 10%, var(--bg-card))'
                    : analysisResult.aiProbability > 30
                    ? 'color-mix(in srgb, var(--accent-warning) 10%, var(--bg-card))'
                    : 'color-mix(in srgb, var(--accent-success) 10%, var(--bg-card))',
                  borderBottom: `1px solid ${
                    analysisResult.aiProbability > 60 
                      ? 'var(--accent-danger)'
                      : analysisResult.aiProbability > 30
                      ? 'var(--accent-warning)'
                      : 'var(--accent-success)'
                  }`
                }}>
                  <div className="flex-center" style={{ gap: 'var(--spacing-sm)' }}>
                    {analysisResult.aiProbability > 60 ? (
                      <AlertTriangle size={20} style={{ color: 'var(--accent-danger)' }} />
                    ) : analysisResult.aiProbability > 30 ? (
                      <AlertTriangle size={20} style={{ color: 'var(--accent-warning)' }} />
                    ) : (
                      <CheckCircle size={20} style={{ color: 'var(--accent-success)' }} />
                    )}
                    <span style={{
                      background: analysisResult.aiProbability > 60 
                        ? 'var(--accent-danger)'
                        : analysisResult.aiProbability > 30
                        ? 'var(--accent-warning)'
                        : 'var(--accent-success)',
                      color: 'var(--text-inverse)',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {analysisResult.verdict}
                    </span>
                  </div>
                  <small className="text-muted">
                    File: {analysisResult.filename}
                  </small>
                </div>

                <div className="card-body-modern">
                  <div className="grid-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div>
                      <h5 className="text-lg" style={{ 
                        fontWeight: '600',
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--accent-primary)'
                      }}>
                        Detection Metrics
                      </h5>
                      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            AI Probability
                          </span>
                          <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                            {analysisResult.aiProbability.toFixed(1)}%
                          </strong>
                        </div>
                        <div className="progress-modern">
                          <div
                            className={`progress-bar-modern ${
                              analysisResult.aiProbability > 60 
                                ? 'progress-danger'
                                : analysisResult.aiProbability > 30
                                ? 'progress-warning'
                                : 'progress-success'
                            }`}
                            style={{ width: `${analysisResult.aiProbability}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Confidence
                          </span>
                          <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                            {analysisResult.confidence.toFixed(1)}%
                          </strong>
                        </div>
                        <div className="progress-modern">
                          <div
                            className="progress-bar-modern"
                            style={{ 
                              width: `${analysisResult.confidence}%`,
                              background: 'var(--accent-primary)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg" style={{ 
                        fontWeight: '600',
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--accent-primary)'
                      }}>
                        Suspicious Elements
                      </h5>
                      {analysisResult.suspiciousElements.length > 0 ? (
                        <ul style={{ 
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {analysisResult.suspiciousElements.map(
                            (element, index) => (
                              <li
                                key={index}
                                style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--accent-danger)',
                                  marginBottom: 'var(--spacing-sm)',
                                  paddingLeft: 'var(--spacing-md)',
                                  position: 'relative'
                                }}
                              >
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  color: 'var(--accent-danger)'
                                }}>•</span>
                                {element}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                          No suspicious patterns detected
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg" style={{ 
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-lg)',
                      color: 'var(--accent-primary)'
                    }}>
                      Verification Recommendations
                    </h5>
                    <div className="alert-modern" style={{
                      background: 'color-mix(in srgb, var(--accent-primary) 10%, var(--bg-card))',
                      borderColor: 'var(--accent-primary)',
                      color: 'var(--accent-primary)'
                    }}>
                      <CheckCircle size={18} />
                      <div>
                        <ul style={{ 
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {analysisResult.recommendations.map((rec, index) => (
                            <li key={index} style={{
                              fontSize: '0.875rem',
                              marginBottom: 'var(--spacing-xs)',
                              paddingLeft: 'var(--spacing-md)',
                              position: 'relative'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                color: 'var(--accent-primary)'
                              }}>•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
        color: 'var(--text-primary)',
        padding: 'var(--spacing-2xl) 0',
        marginTop: 'var(--spacing-2xl)',
        borderTop: '1px solid var(--border-light)'
      }}>
        <div className="container-modern">
          <div style={{ textAlign: 'center' }}>
            <div className="flex-center" style={{ 
              marginBottom: 'var(--spacing-lg)',
              gap: 'var(--spacing-md)'
            }}>
              <Shield size={32} style={{ color: 'var(--accent-primary)' }} />
              <h4 className="text-xl" style={{ fontWeight: '700' }}>
                Educational AI Detection Tool
              </h4>
            </div>
            <p className="text-secondary" style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
              fontSize: '1rem',
              lineHeight: '1.7'
            }}>
              This platform helps students and researchers learn to identify
              AI-generated academic content. Always verify suspicious papers
              through proper academic channels and maintain ethical standards in
              research.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
});

const ScientificPaperTool = () => {
  return (
    <AppProvider>
      <ScientificPaperToolContent />
    </AppProvider>
  );
};

export default ScientificPaperTool;
