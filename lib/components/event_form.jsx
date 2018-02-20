import React from 'react';

export const eventForm = ({ state, change, submit, reset }) => {
  return (
    <form className='event-form'>
      { getField('text', 'name', state, change) }
      { getDescription('description', state, change) }
      { getField('datetime-local', 'start', state, change) }
      { getField('datetime-local', 'end', state, change) }
      { getSubmit(state, submit, reset) }
    </form>
  );
}

const getField = (type, text, state, handleChange) => {
  return (
    <label className='form-label'>
      Event { text }
      <input
        type={ type }
        name={ text }
        value={ state[text] }
        onChange={ handleChange }>
      </input>
    </label>
  );
}

const getDescription = (text, state, handleChange) => {
  return (
    <label className='form-label'>
      Event { text }
      <textarea
        name={ text }
        value={ state[text] }
        onChange={ handleChange }>
      </textarea>
    </label>
  )
}

const getSubmit = (state, handleSubmit, handleReset) => {
  const submit = state.submit;

  return (
    <input
      type={ submit ? 'submit' : 'reset' }
      value={ submit ? 'Submit Event' : 'Reset Form' }
      className='button'
      onClick={ submit ? handleSubmit : handleReset }>
    </input>
  );
}
