import React from 'react';

export const eventForm = ({ state, change, submit }) => {
  return (
    <form>
      { getName(change, state) }
      { getDescription(change, state) }
      { getStart(change, state) }
      { getEnd(change, state) }
      { getSubmit(submit) }
    </form>
  );
}

const getName = (handleChange, state) => {
  return (
    <label>
      Event Name:
      <input
        type='text'
        name='name'
        onChange={ handleChange } value={ state.name }></input>
    </label>
  );
}

const getDescription = (handleChange, state) => {
  return (
    <label>
      Event Description:
      <textarea
        type='text'
        name='description'
        onChange= { handleChange }
        value={ state.description }
        />
    </label>
  );
}

const getStart = (handleChange, state) => {
  return (
    <label>
      Event Start Date/Time:
      <input
        type='datetime-local'
        name='start'
        onChange={ handleChange }
        value={ state.start }
        min={ state.start }>
      </input>
    </label>
  );
}

const getEnd = (handleChange, state) => {
  return (
    <label>
      Event End Date/Time (24 hour format):
      <input
        type='datetime-local'
        name='end'
        onChange= { handleChange }
        value={ state.end }>
      </input>
    </label>
  );
}

const getSubmit = handleSubmit => {
  return (
    <input
      type='submit'
      value='Submit Event'
      className='button'
      onClick={ handleSubmit }>
    </input>
  );
}
