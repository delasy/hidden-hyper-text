import { createElement } from './utils.js'

createElement('button', {
  onClick: () => {
    window.alert('Clicked!')
  },
  style: {
    border: '1px solid red',
    color: 'black',
    padding: '10',

    ':hover': {
      color: 'red'
    }
  }
}, 'Hello')
