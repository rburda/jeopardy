import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/category.css';

export default class Category extends Component {
  render() {
    const { cat,onSelectQuestion } = this.props;
    return (
      <li className="catcol">
        <ul className="questionlist">
          <li className="category">{cat.name}</li>
          {cat.questions.map(
            (q,i) => {
              if (q.used) {
                return <li className="questionValue">&nbsp;</li>
              } else {
                return <li className="questionValue" onClick={() => { onSelectQuestion(cat.id, q.id) }}>${q.value}</li>
              }
            })}
        </ul>
      </li> 
    );
  }
};