import React, { useState, useEffect } from 'react';

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);

  const questions = [
    {
      id: 1,
      question: "React được phát triển bởi công ty nào?",
      options: ["Google", "Facebook", "Microsoft", "Apple"],
      correctAnswer: 1,
      explanation: "React được phát triển bởi Facebook (Meta) và được mở mã nguồn năm 2013."
    },
    {
      id: 2,
      question: "Hook nào được sử dụng để quản lý state trong functional component?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: 1,
      explanation: "useState là hook cơ bản nhất để quản lý state trong functional component."
    },
    {
      id: 3,
      question: "JSX là viết tắt của gì?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
      correctAnswer: 0,
      explanation: "JSX viết tắt của JavaScript XML, cho phép viết HTML trong JavaScript."
    },
    {
      id: 4,
      question: "Props trong React là gì?",
      options: [
        "Cách để component thay đổi state",
        "Dữ liệu được truyền từ parent component đến child component",
        "Một loại state đặc biệt",
        "Phương thức để gọi API"
      ],
      correctAnswer: 1,
      explanation: "Props (properties) là cách để truyền dữ liệu từ component cha đến component con."
    },
    {
      id: 5,
      question: "useEffect hook được sử dụng để làm gì?",
      options: [
        "Quản lý state",
        "Xử lý side effects và lifecycle",
        "Tạo context",
        "Render component"
      ],
      correctAnswer: 1,
      explanation: "useEffect được sử dụng để xử lý side effects như API calls, subscriptions, và lifecycle methods."
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setShowResults(true);
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResults]);

  const startQuiz = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(300);
  };

  const selectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
    setIsActive(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(300);
    setIsActive(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const renderStartScreen = () => (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '32px' }}>
        🧠 Quiz React Cơ Bản
      </h1>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>📋 Thông tin quiz</h2>
        <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <p><strong>📊 Số câu hỏi:</strong> {questions.length} câu</p>
          <p><strong>⏱️ Thời gian:</strong> 5 phút</p>
          <p><strong>📝 Loại:</strong> Trắc nghiệm</p>
          <p><strong>🎯 Điều kiện:</strong> Đạt 60% để pass</p>
        </div>
      </div>

      <button
        onClick={startQuiz}
        style={{
          padding: '15px 30px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        🚀 Bắt đầu Quiz
      </button>
    </div>
  );

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const isAnswered = selectedAnswers[question.id] !== undefined;

    return (
      <div>
        {/* Header with timer and progress */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Câu {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: timeLeft <= 60 ? '#dc3545' : '#007bff'
          }}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#e9ecef',
          borderRadius: '3px',
          marginBottom: '30px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#007bff',
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Question */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            color: '#333',
            marginBottom: '25px',
            fontSize: '22px',
            lineHeight: '1.4'
          }}>
            {question.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {question.options.map((option, index) => (
              <label
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  border: selectedAnswers[question.id] === index 
                    ? '2px solid #007bff' 
                    : '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedAnswers[question.id] === index 
                    ? '#e3f2fd' 
                    : 'white',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedAnswers[question.id] !== index) {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAnswers[question.id] !== index) {
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={selectedAnswers[question.id] === index}
                  onChange={() => selectAnswer(question.id, index)}
                  style={{ marginRight: '12px' }}
                />
                <span style={{ fontSize: '16px' }}>
                  <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #eee'
        }}>
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: currentQuestion === 0 ? '#e9ecef' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            ← Câu trước
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={finishQuiz}
                disabled={!isAnswered}
                style={{
                  padding: '10px 20px',
                  backgroundColor: !isAnswered ? '#e9ecef' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: !isAnswered ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🏁 Hoàn thành
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                style={{
                  padding: '10px 20px',
                  backgroundColor: !isAnswered ? '#e9ecef' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: !isAnswered ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                Câu tiếp theo →
              </button>
            )}
          </div>
        </div>

        {/* Answer status */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Đã trả lời: {Object.keys(selectedAnswers).length} / {questions.length}
            </span>
            <div style={{ display: 'flex', gap: '5px' }}>
              {questions.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 
                      index === currentQuestion ? '#007bff' :
                      selectedAnswers[questions[index].id] !== undefined ? '#28a745' : '#e9ecef'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '30px' }}>
          🎉 Kết quả Quiz
        </h1>

        {/* Score summary */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: getScoreColor(score, questions.length),
            marginBottom: '10px'
          }}>
            {score} / {questions.length}
          </div>
          
          <div style={{
            fontSize: '24px',
            color: getScoreColor(score, questions.length),
            marginBottom: '15px'
          }}>
            {percentage}%
          </div>

          <div style={{
            padding: '10px 20px',
            borderRadius: '20px',
            backgroundColor: passed ? '#d4edda' : '#f8d7da',
            color: passed ? '#155724' : '#721c24',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            {passed ? '✅ Đậu' : '❌ Rớt'}
          </div>
        </div>

        {/* Detailed results */}
        <div style={{
          textAlign: 'left',
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '15px 20px',
            fontWeight: 'bold'
          }}>
            📊 Chi tiết kết quả
          </div>
          
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div
                key={question.id}
                style={{
                  padding: '20px',
                  borderBottom: index < questions.length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '10px'
                }}>
                  <span style={{
                    fontSize: '20px',
                    marginRight: '10px'
                  }}>
                    {isCorrect ? '✅' : '❌'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                      Câu {index + 1}: {question.question}
                    </h3>
                    
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Bạn chọn:</strong> {
                        userAnswer !== undefined 
                          ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                          : 'Không trả lời'
                      }
                    </p>
                    
                    {!isCorrect && (
                      <p style={{ margin: '5px 0', color: '#28a745' }}>
                        <strong>Đáp án đúng:</strong> {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                      </p>
                    )}
                    
                    <p style={{ 
                      margin: '10px 0 0 0', 
                      fontSize: '14px', 
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      💡 {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={resetQuiz}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔄 Làm lại Quiz
          </button>
          
          <button
            onClick={() => {
              const resultText = `Quiz React - Kết quả: ${score}/${questions.length} (${percentage}%) - ${passed ? 'Đậu' : 'Rớt'}`;
              navigator.clipboard.writeText(resultText);
              alert('Đã copy kết quả vào clipboard!');
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            📋 Copy kết quả
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '30px',
        minHeight: '500px'
      }}>
        {!isActive && !showResults && renderStartScreen()}
        {isActive && !showResults && renderQuestion()}
        {showResults && renderResults()}
      </div>
    </div>
  );
}

export default QuizApp;