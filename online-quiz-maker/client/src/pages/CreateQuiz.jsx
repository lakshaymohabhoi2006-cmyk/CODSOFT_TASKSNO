import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function blankQuestion() {
  return { text: '', options: ['', '', '', ''], correctIndex: 0 };
}

export default function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function updateQuestion(index, changes) {
    setQuestions((current) => current.map((question, position) => position === index ? { ...question, ...changes } : question));
  }

  function updateOption(questionIndex, optionIndex, value) {
    setQuestions((current) => current.map((question, position) => {
      if (position !== questionIndex) return question;
      return { ...question, options: question.options.map((option, index) => index === optionIndex ? value : option) };
    }));
  }

  function addOption(questionIndex) {
    setQuestions((current) => current.map((question, index) => index === questionIndex ? { ...question, options: [...question.options, ''] } : question));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      const { data } = await api.post('/quizzes', { title, description, questions });
      navigate('/dashboard', { state: { created: true, quizId: data.quiz.id } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not save your quiz. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="wrap section page-section narrow-page">
      <div className="page-heading">
        <span className="eyebrow">Make something people can learn from</span>
        <h1>Build your quiz.</h1>
        <p>Give it a title, add a few questions, and choose the right answer for each.</p>
      </div>
      <form className="form-card quiz-builder" onSubmit={submit}>
        {error && <p className="error-box">{error}</p>}
        <label className="field-label">Quiz title<input maxLength="100" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. The little planet quiz" /></label>
        <label className="field-label">Short description <span className="optional">Optional</span><textarea maxLength="500" rows="3" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will people learn?" /></label>
        <div className="builder-divider" />
        {questions.map((question, questionIndex) => (
          <fieldset className="question-builder" key={questionIndex}>
            <div className="question-builder-heading"><span className="question-number">QUESTION {String(questionIndex + 1).padStart(2, '0')}</span>{questions.length > 1 && <button type="button" className="remove-link" onClick={() => setQuestions(questions.filter((_, index) => index !== questionIndex))}>Remove</button>}</div>
            <label className="field-label">Question<input required value={question.text} onChange={(event) => updateQuestion(questionIndex, { text: event.target.value })} placeholder="Write your question" /></label>
            <p className="options-label">Answer options <span className="optional">Select the correct one</span></p>
            <div className="option-builder-list">
              {question.options.map((option, optionIndex) => (
                <div className={`option-builder ${question.correctIndex === optionIndex ? 'option-correct' : ''}`} key={optionIndex}>
                  <input type="radio" name={`correct-${questionIndex}`} checked={question.correctIndex === optionIndex} onChange={() => updateQuestion(questionIndex, { correctIndex: optionIndex })} aria-label={`Mark option ${optionIndex + 1} as correct`} />
                  <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                  <input required value={option} onChange={(event) => updateOption(questionIndex, optionIndex, event.target.value)} placeholder={`Option ${optionIndex + 1}`} />
                </div>
              ))}
            </div>
            <button type="button" className="text-link add-option" onClick={() => addOption(questionIndex)}>+ Add another option</button>
          </fieldset>
        ))}
        <button type="button" className="button button-outline add-question" onClick={() => setQuestions([...questions, blankQuestion()])}>+ Add a question</button>
        <div className="form-actions"><span className="muted">{questions.length} {questions.length === 1 ? 'question' : 'questions'}</span><button className="button" disabled={saving}>{saving ? 'Saving…' : 'Save quiz ↗'}</button></div>
      </form>
    </section>
  );
}
